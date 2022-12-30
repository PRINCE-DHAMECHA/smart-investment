import express from "express";
const router = express.Router();

import {
  buy,
  sell,
  getUser,
  getShare,
} from "../controllers/shareController.js";
router.route("/Buy").post(buy);
router.route("/Sell").post(sell);
router.route("/getUser").get(getUser);
router.route("/getShare").get(getShare);

export default router;
