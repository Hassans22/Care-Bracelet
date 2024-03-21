import { validation } from '../../middleware/validation.middelware.js';
import * as guardianController from './controller/guardian.endpoint.js'
import { Router } from "express";
import * as validator from '../guardian.validation.js'
const router = Router();

router.post('/signup',validation(validator.signupSchema),guardianController.signup)
router.post('/activateAccount',validation(validator.activateAccountSchema),guardianController.activateAccount);
router.post('/ReconfirmAccountActivation',guardianController.ReconfirmAccountActivation);
router.post('/login', validation(validator.loginSchema), guardianController.login);
router.post('/forgetcode/email',validation(validator.forgetCodeEmailSchema),guardianController.sendForgetPasswordCodeEmail);
router.patch('/reconfirmResetPass/email',validation(validator.reconfirmResetPassEmailSchema),guardianController.ReconfirmResetPasswordEmail);
router.patch('/coderesetPass/email',validation(validator.codeResetPasswordEmailSchema),guardianController.codeResetPasswordWithEmail);
router.patch('/resetPass/email',validation(validator.resetPasswordwithEmail),guardianController.ResetPasswordWithEmail);

export default router 