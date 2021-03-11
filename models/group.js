const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  group_name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = Group = mongoose.model("Group", GroupSchema);
