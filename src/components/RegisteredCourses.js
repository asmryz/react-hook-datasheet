import axios from 'axios';
import React, { useState, useEffect } from 'react';

const RegisteredCourses = (props) => {
	const [grades, setGrades] = useState([]);

	useEffect(() => {
		axios.get(`/api/registrations/grades`).then((grades) => {
			setGrades(grades.data.grades);
		});
	}, []);

	let handleChange = (e) => {
		const { name, value } = e.target;
		axios.patch('/api/registrations/update', { id: name, gradeid: value }).then((res) => {
			axios.get(`/api/registrations/${props.student.regno}`).then((regs) => {
				props.setRegistrations(regs.data);
			});
		});
	};

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Code</th>
						<th>Title</th>
						<th>CrHr</th>
						<th>Grade</th>
						<th>GPA</th>
					</tr>
				</thead>
				<tbody>
					{props.regs.map((reg) => (
						<tr key={reg._id}>
							<td>{reg.course.code}</td>
							<td>{reg.course.title}</td>
							<td>{reg.course.crhr}</td>
							<td>
								<select name={reg._id} value={reg.gradeid || ''} onChange={handleChange}>
									<option hidden value=''></option>
									{grades.length !== 0 &&
										grades.map((g) => (
											<option key={g.gradeid} value={g.gradeid}>
												{g.grade}
											</option>
										))}
								</select>
							</td>
							<td>{reg.gradeid !== null ? reg.grade.gpa : ''}</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td>{props.gpa.toFixed(2)}</td>
					</tr>
				</tfoot>
			</table>
			<div>
				<pre>{JSON.stringify({ grades }, null, 2)}</pre>
			</div>
		</div>
	);
};

export default RegisteredCourses;
