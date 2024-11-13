const express = require('express');
const Expense = require('../schemas/expense');
const ExpenseService = require("../services/ExpensesService");

const router = express.Router();

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = ExpenseService.getExpenses();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single expense by ID
router.get('/:id', async (req, res) => {
  try {
    const expense = new ExpenseService(req.params.id);
    const results = expense.getExpense()
    if (!results) return res.status(404).json({ message: 'Expense not found' });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new expense
router.post('/', async (req, res) => {
  try {
    const newExpense = await  ExpenseService.createExpense(req.body);
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update expense by ID (e.g., change status)
router.put('/:id', async (req, res) => {
  try {
    const expense = new ExpenseService(req.params.id);
    const updatedExpense = expense.updateExpense(req.body);
    if (!updatedExpense) {
      return res.status(404).json({message: 'Expense not found'});
    }
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete expense by ID
router.delete('/:id', async (req, res) => {
  try {
    const expense = new ExpenseService(req.params.id);
    const deletedExpense = await expense.deleteExpense();
    if (!deletedExpense)
      return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
