const Group = require("../schemas/group");
const Expense = require("../schemas/expense");

class GroupService {
    _id;

    constructor(id) {
        this._id = id;
    }

    static async getGroups() {
        return await Group.find().populate('members').exec()
    }

    async getGroup() {
        return await Group.findById(this._id).populate('members').exec()
    }

    static async createGroup(group) {
        return await new Group(group).save()
    }

    async updateGroup(properties) {
        return await Group.findByIdAndUpdate(this._id, properties, { new: true }).exec()
    }

    async deleteGroup() {
        return await Group.findByIdAndDelete(this._id).exec()
    }

    static async generateCsvForGroupExpenses(id) {
        try {
            let expenses = await Expense.find({ group: id }).populate('group').exec();
            let csv = 'User,Amount,Description,Status,Group,Created At,Updated At\n';
            for (let expense of expenses) {
                csv += `${expense.amount},${expense.description},${expense.status},${expense.group ? expense.group.name : ''},${expense.createdAt},${expense.updatedAt}\n`;
            }
            return csv;
        } catch (e) {
            console.error('Error generating CSV for user expenses:', e);
            throw e;
        }
    }
}

module.exports = GroupService