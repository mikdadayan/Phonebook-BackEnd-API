var { Parser } = require("json2csv");

const Contact = require("../models/contact");

exports.downloadCsv = async (req, res, next) => {
  let docs = await Contact.find({}).populate("groups");

  data = docs.map((contact) => {
    let newContact = JSON.parse(JSON.stringify(contact));
    const newGroup = contact.groups.map((group) => group.group_name).join("|");
    newContact.groups = newGroup;
    return newContact;
  });
  const fields = [
    {
      label: "First Name",
      value: "first_name",
    },
    {
      label: "Last Name",
      value: "last_name",
    },
    {
      label: "Phone",
      value: "phone_number",
    },

    {
      label: "Groups",
      value: "groups",
    },
  ];

  const json2csv = new Parser({ fields: fields });

  try {
    const csv = json2csv.parse(data);
    res.attachment("data.csv");
    res.status(200).send(csv);
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).send(error.message);
  }
};
