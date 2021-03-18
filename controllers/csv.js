var { Parser } = require("json2csv");
const csvtojson = require("csvtojson");

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

exports.uploadCsv = async (req, res, next) => {
  let csvData = await csvtojson().fromFile("./uploads/data.csv");
  let groups = [];
  csvData = csvData.map((contact) => {
    groups = groups.concat(contact.Groups.split("|"));
    return {
      first_name: contact["First Name"],
      last_name: contact["First Name"],
      phone_number: contact.Phone,
      groups: contact.Groups.split("|"),
    };
  });
  console.log(csvData);
  // groups
  // console.log(csvData);
  // console.log(groups);
  // try {
  //   await Group.insertMany();
  //   await Contact.insertMany(csvData);
  // } catch (error) {
  //   console.log("error:", error.message);
  //   res.status(500).send(error.message);
  // }
  res.status(200).json({ message: "File successfuly uploaded." });
};
