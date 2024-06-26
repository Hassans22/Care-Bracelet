
import { asyncHandler } from "../utils/errorHandling.js";
import jwt from "jsonwebtoken";
import guardianModel from "../../DB/model/guardian.model.js";
import tokenModel from "../../DB/model/token.model.js";
export const auth = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith(process.env.BEARER_TOKEN))
        return next(new Error("authorization is required or in-valid Bearer Key", { cause: 400 }));

    const token = authorization.split(process.env.BEARER_TOKEN)[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE);

    if (!decoded?.id)
        return next(new Error("in-valid token payload", { cause: 400 }));

    const tokenDB = await tokenModel.findOne({ token, isValid: true });
    if (!tokenDB) return next(new Error("token expired", { cause: 401 }));

    const user = await guardianModel.findById(decoded.id);
    if (!user) return next(new Error("Not register account", { cause: 401 }));

    req.user = user;
    return next();

})