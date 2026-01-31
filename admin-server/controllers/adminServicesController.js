import Service from "../models/Service.js";

/* ==============================
   GET ALL SERVICES (ORDERED)
================================ */
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch services",
    });
  }
};

/* ==============================
   UPDATE SERVICES (REPLACE ALL)
   CMS STRATEGY
================================ */
export const updateServices = async (req, res) => {
  try {
    const { services } = req.body;

    if (!Array.isArray(services)) {
      return res.status(400).json({
        message: "Invalid services data",
      });
    }

    // 🔥 Normalize order & structure
    const normalizedServices = services.map((service, index) => ({
      title: service.title,
      description: service.description,
      points: service.points || [],
      icon: service.icon || "Settings",
      color: service.color || "#C5A059",
      featured: service.featured || false,
      order: index,
    }));

    // CMS logic: replace everything
    await Service.deleteMany({});
    await Service.insertMany(normalizedServices);

    res.status(200).json({
      message: "Services updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update services",
    });
  }
};
