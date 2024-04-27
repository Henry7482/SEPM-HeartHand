import express from "express";      
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/connect.js";
import {blogRouter, scraperRouter, organizationsRouter} from "./src/routes/index.js";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// App Routes
app.use(cors());
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/scraperdata", scraperRouter);
app.use("/api/v1/organizations", organizationsRouter);

const users = [];

app.get("/users", (req, res) => {
    res.send(users);
});

app.post("/users", async (req, res) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      console.log(salt);
      console.log(hashedPassword);
      const user = {name: req.body.name, password: hashedPassword};
      users.push(user);
      res.status(201).send(user);
    } catch {
      res.status(500).send();
    }
})


// Start Function
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

// Start the server
start();
