import joi from "joi";
export const signupSchema = joi
  .object({
    firstName: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(20).required(),
    email: joi.string().email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: {
        allow: ["com", "net"]
      }
    }).required(),
    password: joi
      .string()
      .pattern(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&*])"))
      .required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
    dateOfBirth: joi.date().required(),
    gender: joi.string().valid("Male", "Female").required(),
    phoneNumber1: joi.string().max(11).required(),
    phoneNumber2: joi.string().max(11),
    homeAddress: joi.string().required()
  })
  .required();

export const activateAccountSchema = joi
  .object({
    activationCode: joi.string().max(4).required()
  })
  .required();
export const loginSchema = joi
  .object({
    email: joi.string().required(),
    password: joi.string().required()
  })
  .required();

export const forgetCodeEmailSchema = joi
  .object({
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: {
          allow: ["com", "net"]
        }
      })
      .required()
  })
  .required();
export const reconfirmResetPassEmailSchema = joi
  .object({
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: {
          allow: ["com", "net"]
        }
      })
      .required()
  })
  .required();
export const codeResetPasswordEmailSchema = joi
  .object({
    forgetCode: joi.string().max(4).required(),
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: {
          allow: ["com", "net"]
        }
      })
      .required()
  })
  .required();
export const resetPasswordwithEmail = joi
  .object({
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: {
          allow: ["com", "net"]
        }
      })
      .required(),
    password: joi
      .string()
      .pattern(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&*])"))
      .required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required()
  })
  .required();
export const forgetCodePhoneSchema = joi
  .object({
    phone: joi.string().max(14).required()
  })
export const editProfile = joi
  .object({
    firstName: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(20).required(),
    phoneNumber1: joi.string().max(11).required(),
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: {
          allow: ["com", "net"]
        }
      }),
    dateOfBirth: joi.date().required(),
  })
  .required();
export const deleteAccount = joi.object({
  code: joi.string().required()
}).required();