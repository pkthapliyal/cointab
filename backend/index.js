require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

const dbConnection = require("./config/db");
const { userRoute } = require("./routes/user.route");

// Essential Middleware
app.use(express.json());
app.use(cors());

//  Routes Middleware
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, async () => {
  try {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("DB is connected");
    await dbConnection;
  } catch (error) {
    console.log(error.message);
  }
});
