const User = require('../schemas/user');
const Expense = require('../schemas/expense');
const ObjectId = require('mongoose').Types.ObjectId;

class UserService {

    static async fetchEmployeesWithExpenses() {
        try {
            let responseMap = new Map();
            let results = await User.find({"role": "employee"}).exec() //
            let ids = []
            for (let result of results) {
                ids.push(result._id)
                result.expenses = []
                console.log(result)
                responseMap.set(
                    result._id.toJSON(),
                    {
                        _id: result._id.toJSON(),
                        name: result.name,
                        email: result.email,
                        role: result.role,
                        budget: result.budget,
                        expenses: [],
                        createdAt: result.createdAt,
                        updatedAt: result.updatedAt,
                        __v: result.__v
                    }
                )
            }
            let expenses = await Expense.find( { "user" : { "$in" : ids } }).exec()
            for (let expense of expenses) {
                let user = responseMap.get(expense.user.toJSON())
                user.expenses.push(expense)
                responseMap.set(expense.user.toJSON(), user)
                console.log(expense.user.toJSON())
                console.log(user)
            }
            return Array.from(responseMap.values())
        } catch (e) {
            console.error('Error fetching employees with expenses:', e);
            throw e;
        }
    }
    // static async generateCsvForUserExpenses(userId) {
    static async generateCsvForUserExpenses(id) {
        try {
            let expenses = await Expense.find({ user: id }).populate('user').exec();
            let csv = 'User,Amount,Description,Status,Group,Created At,Updated At\n';
            for (let expense of expenses) {
                csv += `${expense.user.name},${expense.amount},${expense.description},${expense.status},${expense.group ? expense.group.name : ''},${expense.createdAt},${expense.updatedAt}\n`;
            }
            return csv;
        } catch (e) {
            console.error('Error generating CSV for user expenses:', e);
            throw e;
        }
    }
}

module.exports = UserService;