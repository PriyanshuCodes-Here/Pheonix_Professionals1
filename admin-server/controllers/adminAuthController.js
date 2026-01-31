import { generateAdminToken } from "../utils/jwt.js";

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = generateAdminToken();

    return res.json({
      success: true,
      token,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid admin credentials",
  });
};
