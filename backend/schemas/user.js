const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['ordinary', 'manager', 'admin'], required: true },
    budget: {
        total: { type: Number, default: 0 },
        utilized: { type: Number, default: 0 }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
