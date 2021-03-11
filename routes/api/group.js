const express = require("express");
const group = require("../../controllers/group");

const router = express.Router();

router.post("/", group.addGroup);

router.delete("/:groupId/", group.deleteGroup);

router.put("/:groupId/", group.updateGroup);

module.exports = router;
