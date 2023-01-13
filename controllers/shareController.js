import Share from "../models/Share.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import checkUser from "../Utils/checkUser.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const buy = async (req, res) => {
  let { ownerName, stockName, price, quantity } = req.body;
  const createdBy = req.user.userId;
  if (!ownerName || !stockName || !price || !quantity) {
    throw new BadRequestError("Please Provide All Values!!");
  }
  if (price <= 0 || quantity <= 0) {
    throw new BadRequestError("Please Provide Valid Values!!");
  }
  const user = await User.findOne({ name: ownerName });
  if (!user) {
    throw new UnAuthenticatedError("No User Found!!");
  }
  checkUser(req.user, user._id);
  let wallet = user["wallet"];
  if (wallet < quantity * price) {
    throw new BadRequestError("Not Enough Balance In Your Demate Account!!");
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
      .then(async () => {
        res.status(StatusCodes.OK);
        const updateUser2 = await User.updateOne(
          { name: ownerName },
          {
            wallet: newWallet,
          }
        ).then(() => {
          res.json("Buy Success!!");
        });
      })
      .catch(() => {
        throw new BadRequestError("Something Went Wrong :(");
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
      .then(async (newShare) => {
        res.status(StatusCodes.OK);
        const updateUser2 = await User.updateOne(
          { name: ownerName },
          {
            wallet: newWallet,
          }
        ).then(() => {
          res.json("Buy Success!!");
        });
      })
      .catch((e) => {
        throw new BadRequestError("Something Went Wrong :(");
      });
  }
};
const sell = async (req, res) => {
  let { ownerName, stockName, price, quantity } = req.body;
  if (!ownerName || !stockName || !price || !quantity) {
    throw new BadRequestError("Please Provide All Values!!");
  }
  if (price <= 0 || quantity <= 0) {
    throw new BadRequestError("Please Provide Valid Values!!");
  }
  const user = await User.findOne({ name: ownerName });
  if (!user) {
    throw new UnAuthenticatedError("No User Found!!");
  }
  checkUser(req.user, user._id);
  const test = await Share.findOne({ ownerName, stockName });
  if (test) {
    checkUser(req.user, test.createdBy);
    if (Number(test["quantity"]) < Number(quantity)) {
      throw new BadRequestError("You Don't Have Sufficient Quantity to Sell!!");
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
        .then(async () => {
          quantity = oldQuantity;
          let newWallet = parseFloat(user["wallet"] + sellPrice * quantity);
          newWallet = newWallet.toFixed(2);
          const updateUser2 = await User.updateOne(
            { name: ownerName },
            {
              wallet: newWallet,
            }
          ).then(() => {
            res.status(StatusCodes.OK).json("Sell Success!!");
          });
        })
        .catch((e) => {
          throw new BadRequestError("Something Went Wrong :(");
        });
    } else {
      const updateShare = await Share.findOneAndUpdate(
        { ownerName, stockName },
        { ownerName, stockName, price, quantity }
      )
        .then(async () => {
          quantity = oldQuantity;
          let newWallet = parseFloat(user["wallet"] + sellPrice * quantity);
          newWallet = newWallet.toFixed(2);
          const updateUser2 = await User.updateOne(
            { name: ownerName },
            {
              wallet: newWallet,
            }
          ).then(() => {
            res.status(StatusCodes.OK).json("Sell Success!!");
          });
        })
        .catch(() => {
          throw new BadRequestError("Something Went Wrong :(");
        });
    }
  } else {
    throw new BadRequestError("Share Doesn't Exist In Your Demat Account!!");
  }
};

const getShare = async (req, res) => {
  const queryObject = {
    createdBy: req.user.userId,
  };
  const shares = await Share.find(queryObject)
    .then((shares) => {
      res.status(StatusCodes.OK).json(shares);
    })
    .catch(() => {
      throw new BadRequestError("Something Went Wrong :(");
    });
};

const getUser = (req, res) => {
  const queryObject = {
    _id: req.user.userId,
  };
  User.find(queryObject, (err, data) => {
    if (err) {
      throw new BadRequestError("Something Went Wrong :(");
    }
    res.status(StatusCodes.OK).json(data);
  });
};

export { buy, sell, getUser, getShare };
