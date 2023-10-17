const db = require('../models/expense'); // Import your database models

// Create a new expense
exports.createExpense = async (req, res, next) => {
    try {
        const { amount, description, category, date } = req.body;
        const expense = await db.Expense.create({
            amount,
            description,
            category,
            date,
        });
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all expenses
exports.getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await db.Expense.findAll();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get an expense by ID
exports.getExpenseById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const expense = await db.Expense.findByPk(id);
        if (!expense) {
            res.status(404).json({ message: 'Expense not found' });
        } else {
            res.status(200).json(expense);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an expense by ID
exports.updateExpense = async (req, res, next) => {
    const id = req.params.id;
    const { amount, description, category, date } = req.body;
    try {
        const expense = await db.Expense.findByPk(id);
        if (!expense) {
            res.status(404).json({ message: 'Expense not found' });
        } else {
            expense.amount = amount;
            expense.description = description;
            expense.category = category;
            expense.date = date;
            await expense.save();
            res.status(200).json(expense);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res, next) => {
    const id = req.params.id;
    try {
        const expense = await db.Expense.findByPk(id);
        if (!expense) {
            res.status(404).json({ message: 'Expense not found' });
        } else {
            await expense.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
