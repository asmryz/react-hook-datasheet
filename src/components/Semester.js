import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Semester = (props) => {
	const [semesters, setSemesters] = useState([]);
	const [semester, setSemester] = useState(0);

	useEffect(() => {
		axios.get(`/api/courses/all`).then((semesters) => {
			setSemesters(semesters.data);
			console.log(semesters.data);
		});
	}, []);

	useEffect(() => {
		setSemester(props.semno);
	}, [props.semno]);

	let handleChange = (e) => {
		setSemester(Number(e.target.value));
		props.getSemester(Number(e.target.value));
	};

	return (
		<table>
			<tbody>
				<tr>
					<th>Semester : </th>
					<td>
						<select name='semester' value={semester} onChange={handleChange}>
							<option hidden></option>
							{semesters.length !== 0 &&
								semesters.map((sem) => (
									<option key={sem} value={sem}>
										{sem}
									</option>
								))}
						</select>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default Semester;
