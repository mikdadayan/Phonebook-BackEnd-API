const Contact = require("../models/contact");
const Group = require("../models/group");

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
  let contacts = await Contact.find({});

  contacts = contacts.map((contact) => {
    contact.groups = contact.groups.filter((contactGroup) => {
      return contactGroup === req.params.groupId;
    });
    return contact;
  });

  res.status(202).json({ message: "Group deleted.", contacts: contacts });
};

exports.updateGroup = async (req, res, next) => {
  const { groupId } = req.params;
  const { group_name } = req.body;
  console.log(groupId);
  console.log(group_name);
  const updatedGroup = await Group.findByIdAndUpdate(groupId, {
    group_name: group_name,
  });

  res.status(201).json({ message: "Group Updated", updatedGroup });
};
