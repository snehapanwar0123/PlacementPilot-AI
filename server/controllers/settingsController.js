import Settings from "../models/Settings.js";

// Get settings for logged-in user
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ user: req.user._id });

    // Create default settings if they don't exist
    if (!settings) {
      settings = await Settings.create({
        user: req.user._id,
      });
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error("Get Settings Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update settings
export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ user: req.user._id });

    if (!settings) {
      settings = await Settings.create({
        user: req.user._id,
      });
    }

    settings = await Settings.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(settings);
  } catch (error) {
    console.error("Update Settings Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};