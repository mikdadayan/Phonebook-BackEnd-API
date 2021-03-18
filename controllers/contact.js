const Contact = require("../models/contact");
const Group = require("../models/group");

exports.getAllContacts = async (req, res, next) => {
  try {
    const contactsAll = await Contact.find({}).populate("groups");
    res.status(200).json({ message: "All contacts.", contactsAll });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId).populate("groups");
    res.status(200).json({ message: "Contact fetched.", contact });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.searchContact = async (req, res, next) => {
  let { name, phone_number } = req.query;
  name = name.slice(1, name.length - 1);
  if (phone_number)
    phone_number = phone_number.slice(1, phone_number.length - 1);
  let contacts;
  if (name && phone_number) {
    contacts = await Contact.find({
      first_name: { $regex: `.*${name}.*` },
      phone_number: { $regex: `.*${phone_number}.*` },
    }).populate("groups");
    return res.status(200).json({ message: "Searched Contacts", contacts });
  }
  if (name) {
    contacts = await Contact.find({
      first_name: { $regex: `.*${name}.*` },
    }).populate("groups");
    return res.json({ message: "Searched contacts by name", contacts });
  }
  if (phone_number) {
    contacts = await Contact.find({
      phone_number: { $regex: `.*${phone_number}.*` },
    }).populate("groups");
    return res
      .status(200)
      .json({ message: "Searched contacts by number", contacts });
  }
};

exports.addContact = async (req, res, next) => {
  const { first_name, last_name, phone_number, groups } = req.body;
  console.log(req.body);

  const contact = await Contact.findOne({ phone_number: phone_number });
  if (contact) {
    return res.status(400).json({ message: "Phone number already exists." });
  }

  const newContact = new Contact({
    first_name,
    last_name,
    phone_number,
    groups,
  });

  await newContact.save();

  res.status(201).json({
    message: "Contact Created",
    newContact,
  });
};

exports.updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { first_name, last_name, phone_number, groups } = req.body;
  try {
    let contact = await Contact.findById(contactId);
    // let filteredGroups = await Group.find({ group_name: { $in: groups } });
    // filteredGroups = filteredGroups.map((group) => group._id);
    // console.log(filteredGroups);

    if (!contact) {
      return res.status(400).json({ message: "Contact does not exists." });
    }
    contact.first_name = first_name;
    contact.last_name = last_name;
    contact.phone_number = phone_number;
    contact.groups = groups;

    contact = await contact.save();
    return res
      .status(200)
      .json({ message: "Contact Updated", updatedContact: contact });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    await Contact.findByIdAndRemove(contactId);
    res.status(202).json({ message: "Contact removed..." });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};
