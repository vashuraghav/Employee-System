const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
    {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        designation: {type: String},
        salary: {type: Number, required: true, min: 0},
        tax: {type: Number},
        gross_income: {type: Number}
    },
    {timestamps: true},
    { versionKey: false }
);

module.exports = mongoose.model("Employee", EmployeeSchema);