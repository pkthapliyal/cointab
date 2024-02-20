require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;

const dbConnection = require("./config/db");
const { userRoute } = require("./routes/user.route");
const { postRoute } = require("./routes/post.route");

// Essential Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//  Routes Middleware
app.use("/users", userRoute);
app.use("/posts", postRoute);

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
