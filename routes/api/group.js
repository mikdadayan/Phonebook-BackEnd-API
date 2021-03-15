const express = require("express");
const group = require("../../controllers/group");

const router = express.Router();

router.get("/", group.getGroups);

router.post("/", group.addGroup);

router.delete("/:groupId/", group.deleteGroup);

router.put("/:groupId/", group.updateGroup);

module.exports = router;
