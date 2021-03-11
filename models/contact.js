const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  phone_number: {
    type: String,
    required: true,
  },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
});

module.exports = Contact = mongoose.model("Contact", ContactSchema);
