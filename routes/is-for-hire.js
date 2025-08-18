import express from "express";
import { isForHire } from "../controllers/for-hire-controller.js";

const router = express.Router();
router.get("/:username", isForHire);

export default router;
