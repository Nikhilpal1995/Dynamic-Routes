    const express = require('express');
    const router = express.Router();

    // Import the controller functions
    const expenseController = require('../controllers/expense');

    // Create a new expense
    router.post('/add-expense', expenseController.createExpense);

    // Get all expenses
    router.get('/get-expenses', expenseController.getAllExpenses);

    // Get a specific expense by ID
    router.get('/get-expenses/:id', expenseController.getExpenseById);

    // Update an expense by ID
    router.put('/update-expense/:id', expenseController.updateExpense);

    // Delete an expense by ID
    router.delete('/delete-expense/:id', expenseController.deleteExpense);

    module.exports = router;
