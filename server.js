const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/students/', require('./api/student'));
app.use('/api/courses/', require('./api/course'));
app.use('/api/registrations/', require('./api/registration'));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = 5022;

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}/`);
});
