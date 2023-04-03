const EmployeeService = require('../service/EmployeeService');

const createEmployee = async (req, res)=>{
    const createEmployeeRequest = req.body;
    try{
        const createdEmployee = await EmployeeService.createEmployee(createEmployeeRequest);
        res.status(200).json({"success" : true, "data": createdEmployee});
    }catch(err){
        console.log(err);
        res.status(404).send({"success": false , "error_message": err.message});
    }
};

const getEmployee = async (req, res)=>{
    const employeeId = req.params.id;
    try{
        const getEmployee = await EmployeeService.getEmployee(employeeId);
        res.status(200).json({"success" : true, "data": getEmployee});
    }catch(err){
        console.log(err);
        res.status(404).send({"success": false , "error_message": err.message});
    }
};

const getAllEmployees = async (req, res)=>{
    try{
        const getEmployees = await EmployeeService.getAllEmployees();
        res.status(200).json({"success" : true, "data": getEmployees});
    }catch(err){
        console.log(err);
        res.status(404).send({"success": false , "error_message": err.message});
    }
};

const updateEmployeeTax = async (req, res)=>{
    const employeeId = req.params.id;
    try{
        const updateEmployeeTax = await EmployeeService.updateEmployeeTax(employeeId);
        res.status(200).json({"success" : true, "message": "tax calculated successfully"});
    }catch(err){
        console.log(err);
        res.status(404).send({"success": false , "error_message": err.message});
    }
};

const updateAllEmployeesTax = async (req, res)=>{
    try{
        const updateEmployeesTax = await EmployeeService.updateAllEmployeesTax();
        res.status(200).json({"success" : true, "message": "tax calculated successfully"});
    }catch(err){
        console.log(err);
        res.status(404).send({"success": false , "error_message": err.message});
    }
};

module.exports = {createEmployee, getEmployee, getAllEmployees, updateEmployeeTax, updateAllEmployeesTax};