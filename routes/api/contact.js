const express = require("express");
const contact = require("../../controllers/contact");
const csvController = require("../../controllers/csv");

const router = express.Router();

router.get("/", contact.getAllContacts);

router.post("/", contact.addContact);

router.get("/download", csvController.downloadCsv);

router.get("/search", contact.searchContact);

router.get("/:contactId", contact.getContact);

router.put("/:contactId", contact.updateContact);

router.delete("/:contactId", contact.deleteContact);

module.exports = router;
