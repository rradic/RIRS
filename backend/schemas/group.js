const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    budget: {
        total: { type: Number, default: 0 },
        utilized: { type: Number, default: 0 }
    }
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
