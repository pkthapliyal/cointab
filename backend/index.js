require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;

const dbConnection = require("./config/db");
const { userRoute } = require("./routes/user.route");
const { postRoute } = require("./routes/post.route");

// Essential Middleware
const corsOptions = {
  origin: "https://cointab-8nxkejrxd-pkthapliyal.vercel.app",
  methods: "GET,POST,PUT",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

//  Routes Middleware
app.use("/users", userRoute);
app.use("/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Welcome to cointab");
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
