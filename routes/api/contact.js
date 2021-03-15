const express = require("express");
const multer = require("multer");

const contact = require("../../controllers/contact");
const csvController = require("../../controllers/csv");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", contact.getAllContacts);

router.post("/", contact.addContact);

router.get("/download", csvController.downloadCsv);

router.post("/upload", upload.single("data"), csvController.uploadCsv);

router.get("/search", contact.searchContact);

router.get("/:contactId", contact.getContact);

router.put("/:contactId", contact.updateContact);

router.delete("/:contactId", contact.deleteContact);

module.exports = router;
