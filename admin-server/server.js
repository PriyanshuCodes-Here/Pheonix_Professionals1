import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import adminServicesRoutes from "./routes/adminServicesRoutes.js";
import adminBlogRoutes from "./routes/adminBlogRoutes.js";

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin/services", adminServicesRoutes);
app.use("/api/admin/blogs", adminBlogRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Admin server running on port ${process.env.PORT}`);
});
