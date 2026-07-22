import express from "express";
import {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createCompany)
  .get(getCompanies);

router.route("/:id")
  .get(getCompany)
  .put(updateCompany)
  .delete(deleteCompany);

export default router;