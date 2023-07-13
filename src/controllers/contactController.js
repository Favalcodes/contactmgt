const asyncHandler = require("express-async-handler");
const contactModel = require("../models/contacts");

// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contactModel.find({userId: req.user.id});
  res.status(200).json({ message: "Contacts found", data: contacts });
});

// @desc create contact
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber } = req.body;
  if (!email || !name || !phoneNumber) {
    res.status(400);
    throw new Error("Missing required fields");
  }
  const contact = req.body
  contact.userId = req.user.id
  const data = await contactModel.create(contact);
  res.status(200).json({ message: "Contact created successfully", data });
});

// @desc update contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const isExist = await contactModel.findById(id);
  if (!isExist) {
    res.status(404);
    throw new Error("Contact doesn't exist");
  }
  const data = await contactModel.updateOne({ _id: id}, req.body);
  res
    .status(200)
    .json({ message: `update contact with id: ${req.params.id}`, data });
});

// @desc get contact
// @route GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const isExist = await contactModel.findById(id);
  if (!isExist) {
    res.status(404);
    throw new Error("Contact doesn't exist");
  }
  res
    .status(200)
    .json({ message: `Contact found`, data: isExist });
});

// @desc delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const isExist = await contactModel.findById(id);
  if (!isExist) {
    res.status(404);
    throw new Error("Contact doesn't exist");
  }
  const deleted = await contactModel.deleteOne({_id: id})
  res.status(200).json({ message: `delete contact with id: ${req.params.id}`, data: deleted});
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
