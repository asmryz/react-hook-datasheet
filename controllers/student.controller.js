const db = require('../models');

exports.getStudens = (req, res) => {
	db.Student.find()
		.sort({ regno: 1 })
		.limit(10)
		.then((students) => res.status(200).json(students));
};

exports.getStudentByRegNo = (req, res) => {
	db.Student.find({ regno: req.params.regno }).then((student) => res.status(200).json(student[0]));
};

exports.updateStudent = (req, res) => {
	console.log(`Params`, req.body);
	db.Student.findByIdAndUpdate(
		{ _id: req.body._id },
		{
			$set: {
				studentname: req.body.studentname,
				fathername: req.body.fathername,
			},
		},
		{ new: true }
	).then((student) => res.status(200).json(student));
};
