const Contact = require("../models/contact");
const Group = require("../models/group");

exports.getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find({});
    res.status(200).json({ message: "All Groups.", groups });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.addGroup = async (req, res, next) => {
  const { group_name } = req.body;

  if (!req.body || !group_name) {
    return res.status(401).json({
      error: { msg: "Please fill all fields." },
    });
  }

  const group = await Group.findOne({ group_name: group_name });
  if (group) {
    return res.status(400).json({ message: "Group name already exists." });
  }
  const newGroup = new Group({ group_name });
  await newGroup.save();

  res.status(201).json({ message: "Created new group.", group: newGroup });
};

exports.deleteGroup = async (req, res, next) => {
  const { groupId } = req.params;
  await Group.findByIdAndDelete(groupId);
  let contacts = await Contact.find({}).populate("groups");

  contacts = contacts.map((contact) => {
    contact.groups = contact.groups.filter((contactGroup) => {
      return contactGroup._id !== req.params.groupId;
    });
    return contact;
  });

  res.status(202).json({ message: "Group deleted.", contacts: contacts });
};

exports.updateGroup = async (req, res, next) => {
  const { groupId } = req.params;
  const { group_name } = req.body;
  const updatedGroup = await Group.findByIdAndUpdate(groupId, {
    group_name: group_name,
  });

  res.status(201).json({ message: "Group Updated", updatedGroup });
};
