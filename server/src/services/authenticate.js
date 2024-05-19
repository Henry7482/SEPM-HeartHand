import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Donor from "../models/Donor.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import RefreshToken from "../models/RefreshToken.js";
dotenv.config();

const login = async (req, res) => {
  let foundUser = null;
  const requestUser = req.body;

  if (requestUser.role == "donor") {
    try {
      foundUser = await Donor.findOne({ username: requestUser.username })
        .select("+role")
        .exec();
    } catch (error) {
      return res.status(400).send({ message: "Cannot find user" });
    }
    // users = [
    //   {
    //     username: "Phuc",
    //     password: "hihihi",
    //   },
    // ];
  } else if (req.body.role == "admin") {
    try {
      foundUser = await Admin.findOne({ username: requestUser.username })
        .select("+role")
        .exec();
    } catch (error) {
      return res.status(400).send({ message: "Cannot find user" });
    }
  } else {
    return res.status(400).send({ message: "Invalid role" });
  }

  if (!foundUser) {
    return res.status(400).send({ message: "Cannot find user" });
  }

  try {
    // if (requestUser.password == foundUser.password) {
    if (await bcrypt.compare(requestUser.password, foundUser.password)) {
      const refreshTokenDoc = await RefreshToken.create({
        owner: foundUser._id,
      });
      const refreshToken = generateRefreshToken(foundUser, refreshTokenDoc._id);
      const accessToken = generateAccessToken(foundUser);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.send({
        message: "Login success",
        accessToken,
        user: {
          username: foundUser.username,
          role: foundUser.role,
          id: foundUser._id,
        },
      });
    } else {
      res
        .status(401)
        .send({ message: "Login Failed. Username or password is incorrect" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const generateAccessToken = (requestUser) => {
  return jwt.sign(
    { userID: requestUser._id, role: requestUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "30m" }
  );
};

const generateRefreshToken = (requestUser, refreshTokenID) => {
  return jwt.sign(
    {
      userID: requestUser._id,
      role: requestUser.role,
      tokenID: refreshTokenID,
    },
    process.env.REFRESH_JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const newRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken)
    return res.status(401).send({ message: "Unauthorized" });
  const currentRefreshToken = cookies.refreshToken;
  let currentUser = null;
  let decodedToken = null;
  try {
    decodedToken = await verifyRefreshToken(req.body.refreshToken);
    currentUser = await Donor.findById(decodedToken.userID);
  } catch (error) {
    return res.status(403).send({ message: error.message });
  }

  const refreshTokenDoc = await RefreshToken.create({
    owner: currentRefreshToken.userID,
  });
  await RefreshToken.findByIdAndDelete(currentRefreshToken.tokenID);

  const refreshToken = generateRefreshToken(currentUser, refreshTokenDoc._id);
  const accessToken = generateAccessToken(currentUser);

  res.cookie("token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.send({
    message: "New refresh token generated",
    accessToken,
  });
};

const newAccessToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken)
    return res.status(401).send({ message: "Unauthorized" });
  const refreshToken = cookies.refreshToken;
  let decodedToken = null;
  try {
    decodedToken = await verifyRefreshToken(refreshToken);
  } catch (error) {
    return res.status(403).send({ message: error.message });
  }
  const currentUser = await Donor.findById(decodedToken.userID);
  const accessToken = generateAccessToken(currentUser);

  res.send({
    message: "New access token generated",
    accessToken,
  });
};

const verifyRefreshToken = async (refreshToken) => {
  if (refreshToken == null) throw new Error("Unauthorized");
  let decodedtoken = null;
  try {
    decodedtoken = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
  } catch (error) {
    throw new Error(error.message);
  }

  const foundToken = await RefreshToken.exists({ _id: decodedtoken.tokenID });
  if (foundToken) {
    return decodedtoken;
  } else {
    throw new Error("Unauthorized");
  }
};

const logout = async (req, res) => {
  // removed access token from the frontend first

  const cookies = req.cookies;
  if (!cookies?.refreshToken)
    return res.status(401).send({ message: "Unauthorized" });
  const refreshToken = cookies.refreshToken;
  let decodedToken = null;
  try {
    decodedToken = await verifyRefreshToken(refreshToken);
  } catch (error) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(403).send({ message: error.message });
  }
  await RefreshToken.findByIdAndDelete(decodedToken.tokenID);
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.sendStatus(204);
};

export {
  login,
  generateAccessToken,
  newRefreshToken,
  newAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  logout,
};
