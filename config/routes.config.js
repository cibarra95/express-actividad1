const express = require('express');
const router = express.Router();
const {
    getAllEmployees,
    getPaginatedEmployees,
    getOldestEmployee,
    getUserPrivileges,
    addEmployee,
    getEmployeesByBadge,
    getEmployeeByName,
    getAdminPrivileges
} = require('../controllers/employees.controller');

router.get('/', (req, res) => {
    console.log(req.query)
    if (req.query.user === 'true') return getUserPrivileges(req, res);
    if (req.query.user === 'false') return getAdminPrivileges(req,res);
    if (req.query.badges) return getEmployeesByBadge(req, res);
    if (req.query.page) return getPaginatedEmployees(req, res);
    return getAllEmployees(req, res);
});

router.get('/oldest', getOldestEmployee);
router.post('/', addEmployee);
router.get('/:name', getEmployeeByName);

module.exports = router;