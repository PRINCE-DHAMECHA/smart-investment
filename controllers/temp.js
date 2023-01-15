import Share from "../models/Share.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import checkUser from "../Utils/checkUser.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const buy = async (req, res) => {
  let { ownerName, stockName, price, quantity } = req.body;
  const createdBy = req.user.userId;
  if (!ownerName || !stockName || !price || !quantity) {
    throw new BadRequestError("please provide all values");
  }

  const user = await User.findOne({ name: ownerName });
  if (!user) {
    throw new UnAuthenticatedError("No User Found");
  }
  checkUser(req.user, user._id);
  let wallet = user["wallet"];
  if (wallet < quantity * price) {
    throw new BadRequestError("Not Enough Balance In Your Demate Account");
  }
  let newWallet = parseFloat(wallet - price * quantity);
  newWallet = newWallet.toFixed(2);

  const test = await Share.findOne({ ownerName, stockName });
  if (test) {
    checkUser(req.user, test.createdBy);
    price =
      (parseFloat(test["price"]) * parseFloat(test["quantity"]) +
        parseFloat(price) * parseFloat(quantity)) /
      (parseFloat(test["quantity"]) + parseFloat(quantity));
    quantity = Number(quantity) + Number(test["quantity"]);
    const updateShare = await Share.findOneAndUpdate(
      { ownerName, stockName },
      { ownerName, stockName, price, quantity }
    )
      .then(() => {
        res.status(StatusCodes.OK);
      })
      .catch(() => {
        throw new BadRequestError(
          "Couldn't Complete Your Order Please Try Again"
        );
      });
  } else {
    price = parseFloat(price);
    quantity = Number(quantity);
    const newShare = await Share.create({
      ownerName,
      stockName,
      price,
      quantity,
      createdBy,
    })
      .then((newShare) => {
        res.status(StatusCodes.OK);
      })
      .catch((e) => {
        throw new BadRequestError(
          "Couldn't Complete Your Order Please Try Again"
        );
      });
  }
  const updateUser2 = await User.updateOne(
    { name: ownerName },
    {
      wallet: newWallet,
    }
  );
  res.json("Buy Success!!");
};
const sell = async (req, res) => {
  let { ownerName, stockName, price, quantity } = req.body;
  if (!ownerName || !stockName || !price || !quantity) {
    throw new BadRequestError("please provide all values");
  }
  const user = await User.findOne({ name: ownerName });
  if (!user) {
    throw new UnAuthenticatedError("No User Found");
  }
  checkUser(req.user, user._id);
  const test = await Share.findOne({ ownerName, stockName });
  if (test) {
    checkUser(req.user, test.createdBy);
    if (Number(test["quantity"]) < Number(quantity)) {
      throw new BadRequestError("You Don't Have Sufficient Quantity to Sell");
    }
    const newQuantity = Number(test["quantity"]) - Number(quantity);
    let oldQuantity = quantity;
    quantity = newQuantity;
    const sellPrice = price;
    price = Number(test["price"]);
    if (quantity <= 0) {
      const removeShare = await Share.findOneAndRemove({
        ownerName,
        stockName,
      })
        .then(() => res.status(StatusCodes.OK))
        .catch((e) => {
          throw new BadRequestError("Something Went Wrong");
        });
    } else {
      const updateShare = await Share.findOneAndUpdate(
        { ownerName, stockName },
        { ownerName, stockName, price, quantity }
      )
        .then(() => res.status(StatusCodes.OK))
        .catch(() => {
          throw new BadRequestError("Something Went Wrong Please Try Again");
        });
    }
    quantity = oldQuantity;

    let newWallet = parseFloat(user["wallet"] + sellPrice * quantity);
    newWallet = newWallet.toFixed(2);
    const updateUser2 = await User.updateOne(
      { name: ownerName },
      {
        wallet: newWallet,
      }
    );
    res.json("Sell Success!!");
  }
  throw new BadRequestError("Share Doesn't Exist In Your Demat Account");
};

const getShare = async (req, res) => {
  const queryObject = {
    createdBy: req.user.userId,
  };
  const shares = await Share.find(queryObject);
  res.status(StatusCodes.OK).json(shares);
};

const getUser = (req, res) => {
  const queryObject = {
    _id: req.user.userId,
  };
  User.find(queryObject, (err, data) => {
    if (err) {
      throw new BadRequestError("Something Went Wrong");
    }
    res.json(data);
  });
};

export { buy, sell, getUser, getShare };
