const express = require('express');
const router = express.Router();
const UserService = require("../services/UserService");

router.get('/', async (req, res) => {
    try {
        const employees = await UserService.fetchEmployeesWithExpenses();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;