import Donor from "../../models/Donor.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    const users = await Donor.find();
    if (users.find((user) => user.username === req.body.username)) {
      return res.status(400).send("Username already exists. Please try different one.");
    }
    if (users.find((user) => user.email === req.body.email)) {
      return res.status(400).send("Email already exists. Please try different one.");
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const donor = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    await Donor.create(donor);
    res.status(201).send({ message: "Successfully created user!", donor });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default signup