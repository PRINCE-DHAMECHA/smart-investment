import giversNote from "../models/giversNote.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import checkUser from "../Utils/checkUser.js";

const createNote = async (req, res) => {
  const { lender, principal, interest } = req.body;
  if (!lender || !principal || !interest) {
    throw new BadRequestError("Please Provide All Values!!");
  }
  const createdBy = req.user.userId;
  const user = await User.findOne({ name: lender });
  checkUser(req.user, user._id);
  const user1 = await giversNote.create({
    lender,
    principal,
    interest,
    createdBy,
  });
  res.status(StatusCodes.CREATED).json({
    user1,
  });
};

const getNotes = async (req, res) => {
  giversNote.find((err, data) => {
    if (err) {
      throw new BadRequestError("Something Went Wrong :(");
    }
    res.status(StatusCodes.OK).json(data);
  });
};
const getMyNotes = async (req, res) => {
  const queryObject = {
    createdBy: req.user.userId,
  };
  giversNote.find(queryObject, (err, data) => {
    if (err) {
      throw new BadRequestError("Something Went Wrong :(");
    }
    res.status(StatusCodes.OK).json(data);
  });
};

export { createNote, getNotes, getMyNotes };
