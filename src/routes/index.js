const express = require('express')
const { createContact, deleteContact, getContact, getContacts, updateContact } = require('../controllers/contactController')
const validateToken = require('../middleware/validateToken')

const router = express.Router()

router.use(validateToken)
router.route('/').get(getContacts).post(createContact)

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

module.exports = router