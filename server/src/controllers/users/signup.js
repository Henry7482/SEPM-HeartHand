import Donor from "../../models/Donor.js";

import bcrypt from "bcrypt";
import RefreshToken from '../../models/RefreshToken.js';
import { generateAccessToken, generateRefreshToken } from "../../services/authenticate.js";

const signup = async (req, res) => {
  try {
    const users = await Donor.find();
    if (users.find((user) => user.username === req.body.username)) {
      return res
        .status(400)
        .send({
          message: "Username already exists. Please try different one.",
        });
    }
    if (users.find((user) => user.email === req.body.email)) {
      return res
        .status(400)
        .send({ message: "Email already exists. Please try different one." });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newDonor = new Donor({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const refreshTokenDoc = new RefreshToken({
      owner: newDonor._id
    });

    const refreshToken = generateRefreshToken(newDonor, refreshTokenDoc._id);
    const accessToken = generateAccessToken(newDonor);

    await newDonor.save();
    await refreshTokenDoc.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
  
    res.status(201).json({ message: "Successfully created user!",user: {username: newDonor.username, role: "donor"}, accessToken });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default signup;
