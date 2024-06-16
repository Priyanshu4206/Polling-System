import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  loginUser,
  updateUser,
  registerUser,
  deleteUser,
  getUserDetails,
} from "../controllers/userController.js";
import { logoutUser } from "../controllers/userController.js";
const router = new Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(auth, logoutUser);

router.route("/").get(auth, getUserDetails);

router.route("/").delete(auth, deleteUser);

router.route("/").put(auth, updateUser);

export default router;
