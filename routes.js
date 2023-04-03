const router = require("express").Router();
const EmployeeController = require("./controller/EmployeeController");

router.post("/employee", EmployeeController.createEmployee);
router.get("/employee/:id", EmployeeController.getEmployee);
router.get("/employee", EmployeeController.getAllEmployees);
router.get("/tax/employee", EmployeeController.updateAllEmployeesTax);
router.get("/tax/employee/:id", EmployeeController.updateEmployeeTax);

module.exports = router;