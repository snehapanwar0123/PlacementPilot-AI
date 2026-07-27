import Note from "../models/Note.js";
import Roadmap from "../models/Roadmap.js";
import { generateSmartNotes } from "../services/geminiService.js";

// Generate or Fetch Smart Notes
export const getSmartNotes = async (req, res) => {
  try {
    const { roadmapId, topic } = req.body;

    if (!roadmapId || !topic) {
      return res.status(400).json({
        message: "Roadmap ID and topic are required.",
      });
    }

    // Check if note already exists
    const existingNote = await Note.findOne({
      user: req.user._id,
      topic,
    });

    if (existingNote) {
      const alreadyExists = existingNote.roadmaps.some(
        (r) => r.roadmapId.toString() === roadmapId
      );

      if (!alreadyExists) {
        // We'll fetch the roadmap below, so don't return yet.
      } else {
        return res.status(200).json(existingNote);
      }
    }

    // Fetch roadmap to get role and level
    const roadmap = await Roadmap.findOne({
      _id: roadmapId,
      user: req.user._id,
    });

    if (!roadmap) {
      return res.status(404).json({
        message: "Roadmap not found.",
      });
    }
    if (existingNote) {
      existingNote.roadmaps.push({
        roadmapId,
        role: roadmap.role,
      });

      await existingNote.save();

      return res.status(200).json(existingNote);
    }

    // Generate AI notes
    const aiNote = await generateSmartNotes(
      roadmap.role,
      roadmap.currentLevel,
      topic
    );

    // Save generated note
    const note = await Note.create({
      user: req.user._id,
      roadmaps: [
      {
        roadmapId,
        role: roadmap.role,
      },
],
      topic,
      explanation: aiNote.explanation,
      keyConcepts: aiNote.keyConcepts,
      commonMistakes: aiNote.commonMistakes,
      interviewQuestions: aiNote.interviewQuestions,
      exampleCode: aiNote.exampleCode,
      revisionSummary: aiNote.revisionSummary,
      quiz: aiNote.quiz,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate smart notes.",
    });
  }
};

// Get All Saved Notes (Knowledge Hub)
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find(
      { user: req.user._id },
      {
        topic: 1,
        roadmaps: 1,
        createdAt: 1,
      }
    ).sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch notes.",
    });
  }
};
// Get Single Note
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found.",
      });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch note.",
    });
  }
};

// Delete Note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found.",
      });
    }

    res.status(200).json({
      message: "Note deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete note.",
    });
  }
};