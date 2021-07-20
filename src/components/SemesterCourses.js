import axios from 'axios';
import React, { useState, useEffect } from 'react';

const SemesterCourses = (props) => {
	const [courses, setCourses] = useState([]);
	const { semester, courseids } = props;
	useEffect(() => {
		axios.get(`/api/courses/${semester}`).then((courses) => {
			setCourses(courses.data);
			//console.log(courses.data);
		});
	}, [semester]);

	let handleChange = (e) => {
		const { name, value, checked } = e.target;
		let courseids = checked ? courses.map((course) => course.courseid).filter((e) => !props.regs.includes(e)) : [];

		props.getCourseIds({ name, value, courseids });
	};

	return (
		<div>
			{courses.length !== 0 && (
				<table>
					<thead>
						<tr>
							<th>
								<input type='checkbox' name='master' onChange={handleChange} />
							</th>
							<th>Code</th>
							<th>Title</th>
							<th>CrHr</th>
						</tr>
					</thead>
					<tbody>
						{courses.map((c) => (
							<tr key={c.courseid}>
								<td>
									{!props.regs.includes(c.courseid) ? (
										<input
											type='checkbox'
											name='courseid'
											value={c.courseid}
											onChange={handleChange}
											checked={props.courseids.includes(c.courseid)}
										/>
									) : (
										''
									)}
								</td>
								<td>{c.code}</td>
								<td style={{ width: '350px' }}>{c.title}</td>
								<td>{c.crhr}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{courseids.length !== 0 && <button onClick={props.addRegistrations}>Register</button>}
		</div>
	);
};

export default SemesterCourses;
