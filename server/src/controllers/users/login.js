import Donor from "../../models/Donor.js";
import Admin from "../../models/Admin.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
    let users = [];
    const requestUser = req.body.user;

    if (req.body.role == "donor") {
        users = await Donor.find();        
    } else if (req.body.role == "admin") {
        users = await Admin.find();
    }
    else {
        return res.status(400).send("Invalid role");
    }

    if (users == null || users.length == 0) {
      return res.status(400).send("Cannot find user");
    }
     
    const foundUser = users.find((user) => user.username === requestUser.username);
    if (foundUser == null) {
      return res.status(400).send("Cannot find user");
    }
    try {
      if (await bcrypt.compare(requestUser.password, foundUser.password)) {
        const token = jwt.sign(requestUser, process.env.JWT_SECRET, {expriresIn: '1h'});
        res.cookie("token", token, {httpOnly: true, secure: true, sameSite: "none"});
        res.send("Login success").redirect("#");
      } else {
        res.send("Login Failed. Username or password is incorrect");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

export default login;
