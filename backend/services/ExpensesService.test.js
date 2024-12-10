const ExpenseService = require('./ExpensesService');
const Expense = require('../schemas/expense');
const mongoose = require('mongoose');

jest.mock('../schemas/expense');

describe('ExpenseService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Pridobi vse stroške z uporabnikom in skupino napolnjene', async () => {
        const mockExpenses = [{_id: '1', amount: 100, user: {}, group: {}}];
        Expense.find.mockReturnValue({populate: jest.fn().mockReturnValue({populate: jest.fn().mockReturnValue({exec: jest.fn().mockResolvedValue(mockExpenses)})})});

        const expenses = await ExpenseService.getExpenses();

        expect(expenses).toEqual(mockExpenses);
        expect(Expense.find).toHaveBeenCalled();
    });

    it('Pridobi strošek po ID-ju z uporabnikom in skupino napolnjene', async () => {
        const mockExpense = {_id: '1', amount: 100, user: {}, group: {}};
        Expense.findById.mockReturnValue({populate: jest.fn().mockReturnValue({populate: jest.fn().mockReturnValue({exec: jest.fn().mockResolvedValue(mockExpense)})})});

        const expenseService = new ExpenseService('1');
        const expense = await expenseService.getExpense();

        expect(expense).toEqual(mockExpense);
        expect(Expense.findById).toHaveBeenCalledWith('1');
    });

    it('Ustvariti bi moral nov strošek', async () => {
        const mockExpense = {_id: '1', amount: 100};
        Expense.prototype.save.mockResolvedValue(mockExpense);

        const expense = await ExpenseService.createExpense(mockExpense);

        expect(expense).toEqual(mockExpense);
        expect(Expense.prototype.save).toHaveBeenCalled();
    });

    it('Posodobiti bi moral strošek po ID-ju', async () => {
        const mockExpense = {_id: '1', amount: 200};
        Expense.findByIdAndUpdate.mockReturnValue({exec: jest.fn().mockResolvedValue(mockExpense)});

        const expenseService = new ExpenseService('1');
        const updatedExpense = await expenseService.updateExpense({amount: 200});

        expect(updatedExpense).toEqual(mockExpense);
        expect(Expense.findByIdAndUpdate).toHaveBeenCalledWith('1', {amount: 200}, {new: true});
    });

    it('Izbrisati bi moral strošek po ID-ju', async () => {
        const mockExpense = {_id: '1', amount: 100};
        Expense.findByIdAndDelete.mockReturnValue({exec: jest.fn().mockResolvedValue(mockExpense)});

        const expenseService = new ExpenseService('1');
        const deletedExpense = await expenseService.deleteExpense();

        expect(deletedExpense).toEqual(mockExpense);
        expect(Expense.findByIdAndDelete).toHaveBeenCalledWith('1');
    });

    it('Stroške bi moral pretvoriti v format CSV', () => {
        const mockExpenses = [
            {
                _id: '1',
                amount: 100,
                description: 'Lunch',
                status: 'Paid',
                user: {name: 'John'},
                group: {name: 'Work'},
                createdAt: new Date('2023-01-01T10:00:00Z'),
                updatedAt: new Date('2023-01-01T10:00:00Z')
            },
            {
                _id: '2',
                amount: 200,
                description: 'Dinner',
                status: 'Pending',
                user: {name: 'Jane'},
                group: null,
                createdAt: new Date('2023-01-02T10:00:00Z'),
                updatedAt: new Date('2023-01-02T10:00:00Z')
            }
        ];

        const csv = ExpenseService.convertToCSV(mockExpenses);
        const expectedCSV = '_id,amount,description,status,user,group,createdAt,updatedAt\n' +
            '1,100,Lunch,Paid,John,Work,1. 1. 202311:00:001. 1. 202311:00:00\n' +
            '2,200,Dinner,Pending,Jane, ,2. 1. 202311:00:002. 1. 202311:00:00\n';

        expect(csv).toBe(expectedCSV);
    });

    it('Pridobiti bi moral stroške s filtrom', async () => {
        const mockExpenses = [{_id: '1', amount: 100, user: {}, group: {}}];
        const filter = {amount: {$gt: 50}};
        Expense.find.mockReturnValue({populate: jest.fn().mockReturnValue({populate: jest.fn().mockReturnValue({exec: jest.fn().mockResolvedValue(mockExpenses)})})});

        const expenses = await ExpenseService.getExpenses(filter);

        expect(expenses).toEqual(mockExpenses);
        expect(Expense.find).toHaveBeenCalledWith(filter);
    });
});

