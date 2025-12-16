var express = require("express");
var fs = require("fs");
var app = express();

// Add middleware for body parsing
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Exercise 1: Basic root route
app.get('/', function(req, res) {
  res.send("hello it is my first express application");
});

// Exercise 2: Additional routes
app.get('/about', function(req, res) {
  res.send("This is basic express application");
});

app.get('/users/:userId/books/:bookId', function(req, res) {
  res.send(req.params);
});

// Exercise 3: Get all students from JSON
app.get('/GetStudents', function(req, res) {
  fs.readFile(__dirname + "/" + "Student.json", 'utf8', function(err, data) {
    if (err) {
      return res.status(500).json({ status: false, message: "Error reading file" });
    }
    console.log(data);
    res.json({
      'status': true,
      'Status_Code': 200,
      'requested at': new Date().toLocaleString(), // Corrected from undefined req.localtime
      'requrl': req.url,
      'request Method': req.method,
      'studentdata': JSON.parse(data)
    });
  });
});

// Exercise 3: Get student by ID
app.get('/GetStudentid/:id', (req, res) => {
  fs.readFile(__dirname + "/" + "Student.json", 'utf8', function(err, data) {
    if (err) {
      return res.status(500).json({ status: false, message: "Error reading file" });
    }
    var students = JSON.parse(data);
    var student = students["Student" + req.params.id];
    console.log("student", student);
    if (student) {
      res.json(student);
    } else {
      res.json({
        'status': true,
        'Status_Code': 200,
        'requested at': new Date().toLocaleString(), // Corrected
        'requrl': req.url,
        'request Method': req.method,
        'studentdata': JSON.parse(data) // Returns all if not found
      });
    }
  });
});

// Exercise 3 (POST): Serve HTML form and handle submission
app.get('/studentinfo', function(req, res) {
  res.sendFile('StudentInfo.html', { root: __dirname });
});

app.post('/submit-data', function(req, res) {
  var name = req.body.firstName + ' ' + req.body.lastName;
  var ageAndGender = req.body.myAge + ' Gender: ' + req.body.gender;
  var qualification = req.body.Qual ? req.body.Qual.join(', ') : ''; // Handle array from checkboxes
  res.json({
    status: true,
    message: "Form Details",
    data: {
      name: name,
      age: ageAndGender,
      Qualification: qualification
    }
  });
});

app.listen(5000, function() {
  console.log("server is running on port 5000");
});