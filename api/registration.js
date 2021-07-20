const router = require('express').Router();
const Controller = require('../controllers');

router.post('/add', Controller.Registration.addRegistration);
router.get('/:regno', Controller.Registration.getRegistrationsByRegNo);
router.patch('/update', Controller.Registration.updateRegistration);
router.get('/gpa/:regno', Controller.Registration.getUpdatedGPA);
router.get('/grades', Controller.Registration.getGrades);

module.exports = router;
