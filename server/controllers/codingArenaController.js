import Problem from "../models/Problem.js";
import UserProblem from "../models/UserProblem.js";

// Get all unique topics
export const getTopics = async (req, res) => {
  try {
    const topics = await Problem.distinct("topic");
    const sheets = await Problem.distinct("sheet");
    const difficulties = await Problem.distinct("difficulty");
    const platforms = await Problem.distinct("platform");

    res.json({
      topics: topics.sort(),
      sheets: sheets.sort(),
      difficulties,
      platforms,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get problems with filters
export const getProblems = async (req, res) => {
  try {
    const { topic, sheet, difficulty, platform } = req.query;

    const filter = {};

    if (topic) filter.topic = topic;
    if (sheet) filter.sheet = sheet;
    if (difficulty) filter.difficulty = difficulty;
    if (platform) filter.platform = platform;

    const problems = await Problem.find(filter).sort({
      topic: 1,
      difficulty: 1,
    });

    const completedProblems = await UserProblem.find({
      user: req.user._id,
      completed: true,
    }).select("problem");

    const completedSet = new Set(
      completedProblems.map((item) => item.problem.toString())
    );

    const response = problems.map((problem) => ({
      ...problem.toObject(),
      completed: completedSet.has(problem._id.toString()),
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark a problem as completed
export const completeProblem = async (req, res) => {
  try {
    const { problemId, notes } = req.body;

    let userProblem = await UserProblem.findOne({
      user: req.user._id,
      problem: problemId,
    });

    if (userProblem) {
      userProblem.completed = true;
      userProblem.completedAt = new Date();

      if (notes !== undefined) {
        userProblem.notes = notes;
      }

      await userProblem.save();
    } else {
      userProblem = await UserProblem.create({
        user: req.user._id,
        problem: problemId,
        completed: true,
        completedAt: new Date(),
        notes: notes || "",
      });
    }

    res.json({
      message: "Problem marked as completed",
      userProblem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user progress
export const getProgress = async (req, res) => {
  try {
    const totalProblems = await Problem.countDocuments();

    const completedProblems = await UserProblem.countDocuments({
      user: req.user._id,
      completed: true,
    });

    const topicWiseProgress = await UserProblem.aggregate([
      {
        $match: {
          user: req.user._id,
          completed: true,
        },
      },
      {
        $lookup: {
          from: "problems",
          localField: "problem",
          foreignField: "_id",
          as: "problem",
        },
      },
      {
        $unwind: "$problem",
      },
      {
        $group: {
          _id: "$problem.topic",
          completed: { $sum: 1 },
        },
      },
    ]);

    res.json({
      totalProblems,
      completedProblems,
      completionPercentage:
        totalProblems === 0
          ? 0
          : ((completedProblems / totalProblems) * 100).toFixed(1),
      topicWiseProgress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};