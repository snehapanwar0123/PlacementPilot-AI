import Company from "../models/Company.js";
import Resume from "../models/Resume.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const resumes = await Resume.find({ user: userId })
      .sort({ createdAt: -1 });
    


    const latestResume = resumes[0];
     const companies = await Company.find({
          user: req.user._id,
        }).sort({ createdAt: -1 });

            const companiesApplied = companies.filter(
          (c) => c.status !== "Wishlist"
        ).length;
        const recentApplications = companies
              .slice(0, 5)
              .map((company) => ({
                _id: company._id,
                companyName: company.companyName,
                role: company.role,
                status: company.status,
                createdAt: company.createdAt,
              }));  
            

const interviews = companies.filter(
  (c) => c.status === "Interview"
).length;

const offers = companies.filter(
  (c) => c.status === "Offer"
).length;

const today = new Date();

const upcomingDeadlines = companies
  .filter((company) => {
    if (!company.deadline) return false;
    return new Date(company.deadline) >= today;
  })
  .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
  .slice(0, 5)
  .map((company) => ({
    _id: company._id,
    companyName: company.companyName,
    role: company.role,
    deadline: company.deadline,
    status: company.status,
  }));

const applicationProgress = Math.min(
  Math.round((companiesApplied / 20) * 100),
  100
);

const stats = {
  resumeScore: latestResume ? latestResume.atsScore : 0,
  companiesApplied,
  interviews,
  offers,
  upcomingDeadlines,
  applicationProgress,
  recentApplications,
};

    res.status(200).json(stats);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load dashboard.",
    });
  }
};