import Roadmap from "../models/Roadmap.js";
import { generateRoadmap } from "../services/geminiService.js";

// Generate & Save Roadmap
export const createRoadmap = async (req, res) => {
  try {
    const {
      role,
      currentLevel,
      duration,
      dailyHours,
    } = req.body;

    if (!role || !currentLevel || !duration || !dailyHours) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const aiRoadmap = await generateRoadmap(
      role,
      currentLevel,
      duration,
      dailyHours
    );

    const roadmap = await Roadmap.create({
      user: req.user._id,
      role,
      currentLevel,
      duration,
      dailyHours,
      sections: aiRoadmap.sections,
    });

    res.status(201).json(roadmap);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate roadmap.",
    });
  }
};

// Get all roadmaps of logged-in user
export const getRoadmap = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(roadmaps);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch roadmaps.",
    });
  }
};

// Get a single roadmap by ID
export const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!roadmap) {
      return res.status(404).json({
        message: "Roadmap not found.",
      });
    }

    res.status(200).json(roadmap);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch roadmap.",
    });
  }
};