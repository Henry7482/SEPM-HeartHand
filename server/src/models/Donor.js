import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const usersDB = mongoose.connection.useDb("users");
const Donor = usersDB.model("donors", DonorSchema);

export default Donor;
