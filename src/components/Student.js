import axios from 'axios';
import React from 'react';

const Student = (props) => {
	let handleKeyPress = (e) => {
		if (e.which === 13) {
			//console.log('Enter Pressed');
			// this.setState({ regno: e.target.value });
			axios.get(`/api/students/${e.target.value}`).then((student) => {
				props.getStudent(student.data);
				console.log(student.data);
			});
			axios.get(`/api/registrations/${e.target.value}`).then((regs) => {
				props.setRegistrations(regs.data);
				//console.log(regs.data);
			});
		}
	};
	return (
		<div>
			<table>
				<tbody>
					<tr>
						<th>Regno : </th>
						<td>
							<input type='text' name='regno' onKeyPress={handleKeyPress} />
						</td>
					</tr>
				</tbody>
			</table>
			<br />
			{Object.keys(props.student).length !== 0 && (
				<table>
					<tbody>
						<tr>
							<th>Name : </th>
							<td>{props.student.studentname}</td>
						</tr>
						<tr>
							<th>Father : </th>
							<td>{props.student.fathername}</td>
						</tr>
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Student;
