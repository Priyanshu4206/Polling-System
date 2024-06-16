import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const auth = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header["authorization"]?.replace("Bearer", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized Request !!");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw new ApiError(403, "Invalid access token");
    }
    req.user = user;
    next();
  });
});

export default auth;
