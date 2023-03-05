import express from "express";
const router = express.Router();

import {
  createNote,
  getNotes,
  getMyNotes,
  grantLoan,
  getMyBorrowings,
  getMyGivings,
  repayLoan,
} from "../controllers/loanController.js";
router.route("/createNote").post(createNote);
router.route("/getNotes").get(getNotes);
router.route("/getMyNotes").get(getMyNotes);
router.route("/grantLoan").post(grantLoan);
router.route("/getMyGivings").get(getMyGivings);
router.route("/getMyBorrowings").get(getMyBorrowings);
router.route("/repayLoan").post(repayLoan);

export default router;
