const express = require('express');
const router = express.Router();
const UserService = require("../services/UserService");
const ExpenseService = require("../services/ExpensesService");

router.get('/', async (req, res) => {
    try {
        const employees = await UserService.fetchEmployeesWithExpenses();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/requests/users', async (req, res) => {
    try {
        const requests = await ExpenseService.getExpenses({status: 'pending', user: { $eq: null}});
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/requests/group', async (req, res) => {
    try {
        const requests = await ExpenseService.getExpenses(
            {status: 'pending', user: { $ne: null}});
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/requests/recent', async (req, res) => {
    try {
        const results = await ExpenseService.getExpenses(
            {status: {$ne: 'pending'}}
        );
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/requests/recentCsv', async (req, res) => {
    try {
        const results = await ExpenseService.getExpenses(
            {status: {$ne: 'pending'}
            });
        const csv = ExpenseService.convertToCSV(results);
        res.header('Content-Type', 'text/csv');
        res.attachment('expenses.csv');
        return res.send(csv);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;