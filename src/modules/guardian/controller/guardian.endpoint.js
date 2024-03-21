
import { asyncHandler } from "../../../utils/errorHandling.js";
import jwt from 'jsonwebtoken';
import {
  TempConfirmationEmail,
  TempForgetPassword
} from '../../../utils/html.js'
import sendEmail from '../../../utils/sendEmail.js'
import bcrypt from 'bcryptjs'
import tokenModel from "../../../../DB/model/token.model.js"
import slugify from "slugify";
import Randomstring from "randomstring";
import guardianModel from "../../../../DB/model/guardian.model.js";


export const signup = asyncHandler(async (req, res, next) => {

  const { firstName,
    lastName,
    email,
    password,
    homeAddress,
    phoneNumber1,
    phoneNumber2,
    gender,
    dateOfBirth
  } = req.body;


  const checkUser = await guardianModel.findOne({ email });
  if (checkUser)
    return next(new Error("Email already Exist", { cause: 409 }));


  const hashPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUND)
  );

  const code = Randomstring.generate({
    length: 4,
    charset: "numeric"
  });
  const currentTime = new Date();
  const uniqueNumber = Randomstring.generate({
    length: 1,
    charset: "numeric"
  });
  const Alphabetic = Randomstring.generate({
    length: 1,
    charset: "alphabetic"
  });

  const user = await guardianModel.create({
    firstName,
    lastName,
    userName: slugify(`${firstName}-${lastName}${uniqueNumber}${Alphabetic}`),
    email,
    password: hashPassword,
    homeAddress,
    phoneNumber1,
    phoneNumber2,
    dateOfBirth,
    gender,
    activationCode: code,
    createdCodeActivateAccount: currentTime
  });

  // token activate account
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SIGNATURE, {
    expiresIn: 60 * 60 * 2
  });
  const isSend = await sendEmail({
    to: email,
    subject: "Please activate your account!",
    html: TempConfirmationEmail(firstName, code)
  });
  return isSend
    ? res.json({
      success: true,
      Message: "check inbox !",
      result: user,
      token_Activate_Account: token
    })
    : next(new Error("wrong please try agian", { cause: 400 }));
})
export const activateAccount = asyncHandler(async (req, res, next) => {
  const { token } = req.headers;
  const { activationCode } = req.body;
  const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE);
  const isUser = await guardianModel.findById(decoded.id);
  if (!isUser) return next(new Error("user not found", { cause: 404 }));
  const codeDocument = await guardianModel.findOne({ activationCode });
  if (codeDocument) {
    await guardianModel.findByIdAndUpdate(codeDocument._id, {
      $set: { isConfirmed: true },
      $unset: { activationCode: 1 }
    });
  return res.json({ message: "Done , now you can logging in", success: true })
  }else

  return next(new Error("In-valid code please check it or request for new code", { cause: 404 }));
});
export const ReconfirmAccountActivation = asyncHandler(
  async (req, res, next) => {
    const { token } = req.headers;
    const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE);
    const code = Randomstring.generate({
      length: 4,
      charset: "numeric"
    });
    const user = await guardianModel.findByIdAndUpdate(decoded.id, {
      activationCode: code,
    });
    if (!user) return next(new Error("Please create a new account"));
    if (user.isConfirmed) return next(new Error("please go to login"));
    const isSend = await sendEmail({
      to: user.email,
      subject: "Please activate your account!",
      html: TempConfirmationEmail(user.firstName, code)
    });
    return isSend
      ? res.json({
        success: true,
        Message: "check inbox !"
      })
      : next(new Error("wrong please try agian", { cause: 400 }));
  }
);
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await guardianModel.findOne({ email });
  if (!user)
    return next(new Error("In-valid Email Or Password", { cause: 400 }));
  if (!user.isConfirmed) {
    const code = Randomstring.generate({
      length: 4,
      charset: "numeric"
    });
    await sendEmail({
      to: user.email,
      subject: "Please activate your account!",
      html: TempConfirmationEmail(user.firstName, code)
    });
    user.activationCode = code;
    await user.save();

    return next(new Error("unactivated account!", { cause: 400 }));
  }
  const comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword)
    return next(new Error("In-valid Email Or Password", { cause: 400 }));
  const token = jwt.sign(
    { id: user._id, userName: user.userName, email: user.email },
    process.env.TOKEN_SIGNATURE,
    { expiresIn: "2d" }
  );
  await tokenModel.create({
    token,
    user: user._id,
    agent: req.headers["user-agent"]
  });
  user.status = "online";
  await user.save();
  return res
    .status(200)
    .json({ success: true, Message: "go to home page", auth: token });
});
export const sendForgetPasswordCodeEmail = asyncHandler(
  async (req, res, next) => {
    const { email } = req.body;
    const user = await guardianModel.findOne({ email });
    if (!user)
      return next(new Error("This account is not available", { cause: 400 }));
    const code = Randomstring.generate({
      length: 4,
      charset: "numeric"
    });
    user.forgetCode = code;
    await user.save();
    const isSend = await sendEmail({
      to: user.email,
      subject: "Reset your password!",
      html: TempForgetPassword(user.firstName, code)
    });
    return isSend
      ? res.json({
        success: true,
        Message: "check inbox !"
      })
      : next(new Error("wrong please try agian", { cause: 400 }));
  }
);
export const ReconfirmResetPasswordEmail = asyncHandler(
  async (req, res, next) => {
    const { email } = req.body;
    const code = Randomstring.generate({
      length: 4,
      charset: "numeric"
    });
    const user = await guardianModel.findOneAndUpdate(
      { email },
      {
        forgetCode: code,
      }
    );
    if (!user) return next(new Error("user not found", { cause: 404 }));
    const isSend = await sendEmail({
      to: user.email,
      subject: "Reset your password!",
      html: TempForgetPassword(user.firstName, code)
    });
    return isSend
      ? res.json({
        success: true,
        Message: "check inbox !"
      })
      : next(new Error("wrong please try agian", { cause: 400 }));
  }
);
export const codeResetPasswordWithEmail = asyncHandler(
  async (req, res, next) => {
    const { forgetCode, email } = req.body;
    const isUser = await guardianModel.findOne({ email });
    if (!isUser) return next(new Error("user not found", { cause: 404 }));
    const codeDocument = await guardianModel.findOne({ forgetCode });
    if (codeDocument) {
      await guardianModel.findOneAndUpdate(
        { email },
        {
          $unset: { forgetCode: 1 }
        }
      );
      return res.json({
        success: true,
        Message: "The code you entered is correct"
      });
    } else {
      return next(new Error("In-valid code", { cause: 400 }));
    }
  }
);
export const ResetPasswordWithEmail = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await guardianModel.findOne({ email });
  if (!user) return next(new Error("In-valid Email", { cause: 400 }));
  user.password = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
  await user.save();
  const tokens = await tokenModel.find({ user: user._id });
  tokens.forEach(async token => {
    token.isValid = false;
    await token.save();
  });
  return res.json({ success: true, Message: "Done" });
});