const express = require('express');
const Group = require('../schemas/group');
const GroupService = require('../services/groupService');

const router = express.Router();

// Get all groups
router.get('/', async (req, res) => {
  try {
    const groups = await GroupService.getGroups();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single group by ID
router.get('/:id', async (req, res) => {
  try {
    const group = (new GroupService(req.params.id)).getGroup();
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new group
router.post('/', async (req, res) => {
  try {
    const group = GroupService.createGroup(req.body);
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update group by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedGroup = (new GroupService(req.params.id)).updateGroup(req.body);
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
    const deletedGroup = new GroupService(req.params.id);
    await deletedGroup.deleteGroup()
    if (!deletedGroup)
      return res.status(404).json({ message: 'Group not found' });
    res.json({ message: 'Group deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
