const Service = require("../models/Service");

/* ================= GET ALL SERVICES (PUBLIC) ================= */
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

/* ================= GET FEATURED SERVICES ================= */
const getFeaturedServices = async (req, res) => {
  try {
    const services = await Service.find({ featured: true })
      .sort({ order: 1 });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch featured services" });
  }
};

/* ================= GET SINGLE SERVICE ================= */
const getSingleService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch service" });
  }
};

module.exports = {
  getAllServices,
  getFeaturedServices,
  getSingleService,
};
