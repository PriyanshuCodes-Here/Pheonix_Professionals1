import About from "../models/About.js";

// GET About content
export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    // first time auto-create
    if (!about) {
      about = await About.create({
        heading: "About Us",
        content: "",
      });
    }

    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch About content" });
  }
};

// UPDATE About content
export const updateAbout = async (req, res) => {
  try {
    const { heading, content } = req.body;

    let about = await About.findOne();

    if (!about) {
      about = await About.create({ heading, content });
    } else {
      about.heading = heading;
      about.content = content;
      await about.save();
    }

    res.json({ message: "About page updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update About content" });
  }
};
