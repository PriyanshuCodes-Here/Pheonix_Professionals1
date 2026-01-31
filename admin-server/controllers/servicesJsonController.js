import { readServices, writeServices } from "../utils/servicesFile.js";

/* GET services (for admin UI) */
export const getServices = (req, res) => {
  const data = readServices();
  res.json(data.services);
};

/* CREATE or UPDATE ALL services */
export const saveServices = (req, res) => {
  const { services } = req.body;

  if (!Array.isArray(services)) {
    return res.status(400).json({ message: "Invalid services data" });
  }

  writeServices({ services });

  res.json({ message: "services.json updated successfully" });
};
