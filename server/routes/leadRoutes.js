import express from "express";
import {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  getStats,
} from "../controllers/leadController.js";

const router = express.Router();

router.get("/stats", getStats);
router.get("/", getLeads);
router.get("/:id", getLead);
router.post("/", createLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;