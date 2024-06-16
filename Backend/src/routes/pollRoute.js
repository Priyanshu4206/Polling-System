import express, { Router } from "express";
import {
  createPoll,
  getAllPolls,
  getPolls,
} from "../controllers/pollController.js";
import auth from "../middleware/auth.js";
const router = Router();

router.route("/").post(auth, createPoll);
router.route("/").get(auth, getAllPolls); // Institute
router.route("/:role").get(auth, getPolls); //user teacher and student

export default router;
