import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "donor",
  },
});

const usersDB = mongoose.connection.useDb("users");
const Donor = usersDB.model("donors", DonorSchema);

export default Donor;
