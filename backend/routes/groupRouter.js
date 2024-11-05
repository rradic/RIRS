const express = require('express');
const Group = require('../schemas/group');

const router = express.Router();

// Get all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find().populate('members');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single group by ID
router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('members');
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new group
router.post('/', async (req, res) => {
  const group = new Group(req.body);
  try {
    const newGroup = await group.save();
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update group by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedGroup)
      return res.status(404).json({ message: 'Group not found' });
    res.json(updatedGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete group by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);
    if (!deletedGroup)
      return res.status(404).json({ message: 'Group not found' });
    res.json({ message: 'Group deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
