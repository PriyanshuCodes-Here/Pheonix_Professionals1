import jwt from "jsonwebtoken";

export const generateAdminToken = () => {
  return jwt.sign(
    { role: "admin" },
    process.env.ADMIN_JWT_SECRET,
    { expiresIn: process.env.ADMIN_JWT_EXPIRE }
  );
};

export const verifyAdminToken = (token) => {
  return jwt.verify(token, process.env.ADMIN_JWT_SECRET);
};
