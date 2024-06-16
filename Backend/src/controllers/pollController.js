import db from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v4 as uuidv4 } from "uuid";
export const createPoll = asyncHandler(async (req, res) => {
  const { question, targetRole } = req.body;
  const customId = uuidv4();
  const createdBy = req.user.userId;
  const resp = await db.query(
    `INSERT INTO polls (id, question, targetRole, createdBy) VALUES (?, ?, ?, ?)`,
    [customId, question, targetRole, createdBy]
  );
  res.status(201).json({ message: "Poll created" });
});

export const getAllPolls = asyncHandler(async (req, res) => {
  const [rows] = await db.query(`SELECT * FROM polls`);
  res.status(200).json({ polls: rows, message: "All Polls Returned !!" });
});

export const getPolls = asyncHandler(async (req, res) => {
  const { role } = req.params;
  const roleLower = role.toLowerCase();
  if (roleLower !== "teacher" && roleLower !== "student") {
    throw new ApiError(400, "Invalid Role !!");
  }
  const [rows] = await db.query(`SELECT * FROM polls WHERE targetRole = ?`, [
    role,
  ]);
  res.status(200).json({ polls: rows, message: "Polls Returned !!" });
});
