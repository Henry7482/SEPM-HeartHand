import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
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
const Admin = usersDB.model("admins", AdminSchema);

export default Admin;
