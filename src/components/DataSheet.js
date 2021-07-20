import axios from 'axios';
import React, { useState } from 'react';
import RegisteredCourses from './RegisteredCourses';
import Semester from './Semester';
import SemesterCourses from './SemesterCourses';
import Student from './Student';

const DataSheet = () => {
	const [student, setStudent] = useState({});
	const [semester, setSemester] = useState(0);
	const [courseids, setCourseids] = useState([]);
	const [regs, setRegs] = useState([]);
	const [gpa, setGpa] = useState(0);

	//const [state, setState] = useState({ student: {}, semester: 0, courseids: [], regs: [], gpa: 0 });

	let getStudent = (s) => {
		setStudent(s);
		setSemester(0);
		setCourseids([]);
		setGpa(0);
	};

	let getSemester = (semno) => {
		setSemester(semno);
	};

	let getCourseIds = (args) => {
		if (args.name === 'master') {
			setCourseids(args.courseids);
		} else {
			let cids = [...courseids];
			let index = cids.indexOf(Number(args.value));
			index === -1 ? cids.push(Number(args.value)) : cids.splice(index, 1);
			setCourseids(cids);
		}
	};

	let setRegistrations = (data) => {
		const { regs, gpa } = data;
		setRegs(regs);
		setGpa(gpa !== undefined ? gpa.gpa : 0);
	};

	let addRegistrations = () => {
		axios
			.post(`/api/registrations/add`, {
				regno: student.regno,
				courseids: JSON.stringify(courseids),
			})
			.then((regs) => {
				setCourseids([]);
				axios.get(`/api/registrations/${student.regno}`).then((regs) => {
					setRegistrations(regs.data);
				});
			});
	};

	return (
		<div>
			<div className='col'>
				<Student getStudent={getStudent} student={student} setRegistrations={setRegistrations} />
				<br />
				{Object.keys(student).length !== 0 && <Semester getSemester={getSemester} semno={semester} />}
				<br />
				{semester !== 0 && (
					<SemesterCourses
						semester={semester}
						getCourseIds={getCourseIds}
						courseids={courseids}
						addRegistrations={addRegistrations}
						regs={regs.map((r) => r.courseid)}
					/>
				)}
			</div>
			<div className='col'>
				{regs.length !== 0 && (
					<RegisteredCourses regs={regs} setRegistrations={setRegistrations} student={student} gpa={gpa} />
				)}
			</div>
			<div className='col'>
				<pre>{JSON.stringify({ student, semester, courseids, regs }, null, 2)}</pre>
			</div>
		</div>
	);
};

export default DataSheet;
