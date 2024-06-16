import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import db from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
const options = {
  http: true,
  secure: true,
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, role, password } = req.body;
  const customId = uuidv4();

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query(
    `INSERT INTO users (id, name, email, phone, role, password) VALUES (?, ?, ?, ?, ?, ?)`,
    [customId, name, email, phone, role, hashedPassword]
  );
  return res
    .status(201)
    .json({ data: { email, password }, message: "User Registered !!" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
  if (rows.length === 0) {
    throw new ApiError(404, "User not Found !!");
  }
  const user = rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials !!");
  }
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  return res
    .status(200)
    .cookie("accessToken", token, options)
    .json({ message: "Login Successfull !!" });
});

export const logoutUser = (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout Successful !!" });
};

const getUserDetails = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const [rows] = await db.query(
    `SELECT id, name, email, phone, role FROM users WHERE id = ?`,
    [userId]
  );
  if (rows.length === 0) {
    throw new ApiError(404, "User not Found !!");
  }
  res.status(200).json(rows[0]);
});

const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { name, email, phone, role, newPassword } = req.body;

  const fieldsToUpdate = { name, email, phone, role };

  if (newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    fieldsToUpdate.password = hashedPassword;
  }
  const queryFields = [];
  let query = "UPDATE users SET ";

  Object.keys(fieldsToUpdate).forEach((key) => {
    if (fieldsToUpdate[key] !== undefined) {
      query += `${key} = ?, `;
      queryFields.push(fieldsToUpdate[key]);
    }
  });

  if (queryFields.length === 0) {
    throw new ApiError(400, "Nothing to update !!");
  }

  query = query.slice(0, -2);
  query += " WHERE id = ?";
  queryFields.push(userId);

  await db.query(query, queryFields);
  res.status(200).json({ message: "User Updated !!" });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  await db.query(`DELETE FROM users WHERE id = ?`, [userId]);
  res.clearCookie("accessToken");
  res.status(200).json({ message: "User Deleted !!" });
});

export { registerUser, loginUser, getUserDetails, updateUser, deleteUser };
