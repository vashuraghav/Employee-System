const EmployeeRepo = require('../repo/EmployeeRepo');

const createEmployee = async (createEmployeeRequest)=>{
    const employee = await EmployeeRepo.createEmployee(createEmployeeRequest);
    return employee;
}

const getEmployee = async (id)=>{
    const employee = await EmployeeRepo.getEmployee(id);
    return employee;
}

const getAllEmployees = async ()=>{
    const employees = await EmployeeRepo.getAllEmployees();
    return employees;
}

const updateEmployeeTax = async (id)=>{
    const employee = await EmployeeRepo.getEmployee(id);
    const tax = calculateTax(employee);
    await EmployeeRepo.updateEmployeeTax(id, tax);
}

const updateAllEmployeesTax = async ()=>{
    const employees = await EmployeeRepo.getAllEmployees();
    await employees.map(async (e) =>{
        const tax = calculateTax(e);
        await EmployeeRepo.updateEmployeeTax(e._id, tax);
    });
}

const calculateTax = (employee) => {
    let tax = 0
    if(employee.salary - 10000 <= 0) return tax; // assume first 10,000 is tax-free
    else{
        const taxableIncome = employee.salary - 10000; // assume first 10,000 is tax-free
        const taxRateSlab1 = 0.2; // 20% tax rate for taxable income till 20,000
        const taxRateSlab2 = 0.3; // 30% tax rate for remaining taxable income
        if(taxableIncome - 20000 >= 0){
            tax += 20000 * taxRateSlab1 + (taxableIncome-20000)* taxRateSlab2;
        }else{
            tax += taxableIncome * taxRateSlab1;
        }
    }
    return tax;
};

module.exports = {createEmployee, getEmployee, getAllEmployees, updateEmployeeTax, updateAllEmployeesTax};