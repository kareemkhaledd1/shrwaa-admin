const express = require('express')
const {getStatus, newStatus, updateStatus, deleteStatus} = require("../controllers/status.controller");

const router = express.Router()

router.get('/', getStatus)
router.post('/', newStatus)
router.put('/:id', updateStatus)
router.delete('/:id', deleteStatus)

module.exports = router