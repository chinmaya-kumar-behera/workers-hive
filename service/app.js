const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { connectToDatabase } = require("./src/config/db");
const adminRouter = require("./src/routes/adminRoutes");
const router = require("./src/routes/router");
const { chatRouter } = require("./src/routes/chatRouter");
const { messageRouter } = require("./src/routes/messageRoutes");


// if (process.env.NODE_ENV === "development") {
//   dotenv.config({ path: ".env.development" });
// } else if (process.env.NODE_ENV === "production") {
//   dotenv.config({ path: ".env.production" });
// }

dotenv.config();

const app = express();

connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.use(
  cors({
    origin: ["http://localhost:3000", "https://workers-hive.vercel.app"],
  })
);

app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "development") {
    res.send("Development API is working fine !");
  } else res.send("Production Api is working fine");
});

app.use("/api/admin", adminRouter);
app.use("/api", router);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

module.exports = app;
