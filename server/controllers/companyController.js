import Company from "../models/Company.js";

// Create Company
export const createCompany = async (req, res) => {
  try {
    const company = await Company.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create company." });
  }
};

// Get All Companies of Logged-in User
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch companies." });
  }
};

// Get Single Company
export const getCompany = async (req, res) => {
  try {
    const company = await Company.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
      });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch company." });
  }
};

// Update Company
export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
      new: true,
      runValidators: true,
    }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
      });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update company." });
  }
};

// Delete Company
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
      });
    }

    res.status(200).json({
      message: "Company deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete company." });
  }
};