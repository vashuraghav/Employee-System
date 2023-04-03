const EmployeeSchema  = require("../models/EmployeeSchema");

const createEmployee = async(employee)=> {
    const newEmployee = new EmployeeSchema(employee);
    return await newEmployee.save();
}

const getEmployee = async(id)=> {
    const employee = await EmployeeSchema.findOne({_id: id});
    return employee;
}

const getAllEmployees = async()=> {
    const employees = await EmployeeSchema.find();
    return employees;
}

const updateEmployeeTax = async(id, tax)=> {
    let employee = await EmployeeSchema.findOne({_id: id});
    employee.tax = tax;
    employee.gross_income = employee.salary - tax;
    await employee.save();
    return employee;
}

module.exports = {createEmployee, getEmployee, getAllEmployees, updateEmployeeTax}