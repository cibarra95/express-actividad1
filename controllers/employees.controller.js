const employees = require('../data/employees.json');

const getAllEmployees = (req, res) => {
    res.json(employees);
};

const getPaginatedEmployees = (req, res) => {
    const page = parseInt(req.query.page, 10);
    const startIndex = 2 * (page - 1);
    const paginatedEmployees = employees.slice(startIndex, startIndex + 2);
    res.json(paginatedEmployees);
};

const getOldestEmployee = (req, res) => {
    const oldest = employees.reduce((prev, curr) => (curr.age > prev.age ? curr : prev), employees[0]);
    res.json(oldest);
};

const getUserPrivileges = (req, res) => {
    const users = employees.filter(employee => employee.privileges === 'user');
    res.json(users);
};

const getAdminPrivileges = (req, res) => {
    const users = employees.filter(employee => employee.privileges === 'admin');
    res.json(users);
};


const addEmployee = (req, res) => {
    const newEmployee= req.body;
    
    if (!newEmployee.name || !newEmployee.age || !newEmployee.privileges || !newEmployee.badges) {
        return res.status(400).json({ code: "bad_request" });
    }
    
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
};

const getEmployeesByBadge = (req, res) => {
    const badge = req.query.badges;
    const result = employees.filter(employee => employee.badges.includes(badge));
    res.json(result);
};

const getEmployeeByName = (req, res) => {
    const name = req.params.name;
    const employee = employees.find(emp => emp.name.toLowerCase() === name.toLowerCase());
    if (!employee) {
        return res.status(404).json({ code: "not_found" });
    }
    res.json(employee);
};

module.exports = {
    getAllEmployees,
    getPaginatedEmployees,
    getOldestEmployee,
    getUserPrivileges,
    addEmployee,
    getEmployeesByBadge,
    getEmployeeByName,
    getAdminPrivileges
};