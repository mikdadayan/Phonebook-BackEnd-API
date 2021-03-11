const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.use("/api/contacts", require("./routes/api/contact"));
app.use("/api/groups", require("./routes/api/group"));

// // Server static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} ...`));
