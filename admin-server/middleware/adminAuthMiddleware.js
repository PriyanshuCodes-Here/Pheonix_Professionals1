import jwt from "jsonwebtoken";

const adminAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No admin token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Not an admin" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid admin token" });
  }
};

export default adminAuthMiddleware;
