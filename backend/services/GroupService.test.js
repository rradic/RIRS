const mongoose = require('mongoose');
const GroupService = require('./GroupService');
const Group = require('../schemas/group');
const Expense = require('../schemas/expense');
const UserService = require('../services/UserService');
const User = require('../schemas/user');

jest.mock('../schemas/user');
jest.mock('../schemas/group');
jest.mock('../schemas/expense');

describe('GroupService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Pridobiti bi moral vse skupine z člani', async () => {
        const mockGroups = [{ _id: '1', name: 'Group 1', members: [] }];
        Group.find.mockReturnValue({ populate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockGroups) }) });

        const groups = await GroupService.getGroups();

        expect(groups).toEqual(mockGroups);
        expect(Group.find).toHaveBeenCalled();
    });

    it('Pridobiti bi moral skupino po ID-ju z člani', async () => {
        const mockGroup = { _id: '1', name: 'Group 1', members: [] };
        Group.findById.mockReturnValue({ populate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockGroup) }) });

        const groupService = new GroupService('1');
        const group = await groupService.getGroup();

        expect(group).toEqual(mockGroup);
        expect(Group.findById).toHaveBeenCalledWith('1');
    });

    it('Ustvariti bi moral novo skupino', async () => {
        const mockGroup = { _id: '1', name: 'Group 1' };
        Group.prototype.save.mockResolvedValue(mockGroup);

        const group = await GroupService.createGroup(mockGroup);

        expect(group).toEqual(mockGroup);
        expect(Group.prototype.save).toHaveBeenCalled();
    });

    it('Posodobiti bi moral skupino po ID-ju', async () => {
        const mockGroup = { _id: '1', name: 'Updated Group' };
        Group.findByIdAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockGroup) });

        const groupService = new GroupService('1');
        const updatedGroup = await groupService.updateGroup({ name: 'Updated Group' });

        expect(updatedGroup).toEqual(mockGroup);
        expect(Group.findByIdAndUpdate).toHaveBeenCalledWith('1', { name: 'Updated Group' }, { new: true });
    });

    it('Izbrisati bi moral skupino po ID-ju', async () => {
        const mockGroup = { _id: '1', name: 'Group 1' };
        Group.findByIdAndDelete.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockGroup) });

        const groupService = new GroupService('1');
        const deletedGroup = await groupService.deleteGroup();

        expect(deletedGroup).toEqual(mockGroup);
        expect(Group.findByIdAndDelete).toHaveBeenCalledWith('1');
    });


    it('should generate CSV for group expenses', async () => {
        const mockExpenses = [
            {
                amount: 100,
                description: 'Office Supplies',
                status: 'Approved',
                group: { name: 'Group 1' },
                createdAt: new Date('2023-01-01').toISOString(),
                updatedAt: new Date('2023-01-02').toISOString()
            },
            {
                amount: 200,
                description: 'Travel',
                status: 'Pending',
                group: { name: 'Group 1' },
                createdAt: new Date('2023-01-03').toISOString(),
                updatedAt: new Date('2023-01-04').toDateString()
            }
        ];

        Expense.find.mockReturnValue({
            populate: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockExpenses)
            })
        });

        const csv = await GroupService.generateCsvForGroupExpenses('1');

        expect(csv).toBe(
            'User,Amount,Description,Status,Group,Created At,Updated At\n' +
            '100,Office Supplies,Approved,Group 1,2023-01-01T00:00:00.000Z,2023-01-02T00:00:00.000Z\n' +
            '200,Travel,Pending,Group 1,2023-01-03T00:00:00.000Z,Wed Jan 04 2023\n'
        );
        expect(Expense.find).toHaveBeenCalledWith({ group: '1' });
    });

    describe('generateCsvOfManagers', () => {
        it('should generate CSV for managers', async () => {
            const mockManagers = [
                {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Manager1',
                    email: 'manager1@example.com',
                    role: 'manager',
                    budget: 1000,
                    createdAt: new Date('2023-01-01T10:00:00Z'),
                    updatedAt: new Date('2023-01-01T10:00:00Z')
                },
                {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Manager2',
                    email: 'manager2@example.com',
                    role: 'manager',
                    budget: 2000,
                    createdAt: new Date('2023-01-02T10:00:00Z'),
                    updatedAt: new Date('2023-01-02T10:00:00Z')
                }
            ];

            User.find.mockResolvedValue(mockManagers);

            const csv = await UserService.generateCsvOfManagers();

            const expectedCSV = 'ID,Name,Email,Role,Budget,Created At,Updated At\n' +
                `${mockManagers[0]._id},${mockManagers[0].name},${mockManagers[0].email},${mockManagers[0].role},${mockManagers[0].budget},${mockManagers[0].createdAt},${mockManagers[0].updatedAt}\n` +
                `${mockManagers[1]._id},${mockManagers[1].name},${mockManagers[1].email},${mockManagers[1].role},${mockManagers[1].budget},${mockManagers[1].createdAt},${mockManagers[1].updatedAt}\n`;

            expect(csv).toBe(expectedCSV);
            expect(User.find).toHaveBeenCalledWith({ role: 'manager' });
        });
    });
});