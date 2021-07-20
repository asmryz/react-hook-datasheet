const router = require('express').Router();
const Controller = require('../controllers');

router.get('/', Controller.Student.getStudens);
router.get('/:regno', Controller.Student.getStudentByRegNo);
router.patch('/update', Controller.Student.updateStudent);

module.exports = router;
