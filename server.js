const express = require("express");
const morgan = require("morgan");

const connectDB = require("./config/db");
const app = express();

connectDB();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});
app.use(express.json());

app.use(morgan("combined"));

app.use("/api/contacts", require("./routes/api/contact"));
app.use("/api/groups", require("./routes/api/group"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} ...`));
