import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    required: true,
  }
});

const usersDB = mongoose.connection.useDb("users");
const RefreshToken = usersDB.model("refresh_tokens", refreshTokenSchema);
export default RefreshToken;