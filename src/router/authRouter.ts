import express from "express";
import { signupController } from "../controllers/authController";
import { signinController } from "../controllers/authController";

const router = express.Router();

router.route("/signin").post(signinController);
router.route("/signup").post(signupController);

export default router;
