import express from "express";
const router = express.Router();

import {
  createNote,
  getNotes,
  getMyNotes,
} from "../controllers/loanController.js";
router.route("/createNote").post(createNote);
router.route("/getNotes").get(getNotes);
router.route("/getMyNotes").get(getMyNotes);

export default router;
