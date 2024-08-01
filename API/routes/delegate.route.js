const router = require("express").Router();
const {
  getDelegateNotes,
  createDelegateNote,
} = require("../controllers/delegate.controller");

router.get("/", getDelegateNotes);
router.post("/", createDelegateNote);

module.exports = router;
