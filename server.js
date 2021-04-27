// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Express to run server and routes
const express = require('express');
const path = require('path');
// Start up an instance of app
const app = express();

/* Dependencies */
var bodyParser = require('body-parser')
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
var cors = require('cors');

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 3000;

const server = app.listen(port, listener);

// Callback to debug
function listener() {
    console.log(`Server is running and listening on port : ${port}`);
}

// Initialize all route with a callback function
app.get('/all', sendData);
// Callback function to complete GET '/all'
function sendData(req, res) {
    console.log(projectData);
    res.send(projectData);
    projectData = [];
}
// Post Route
app.post('/add', (req, res) => {
    console.log(req.body);
    newData= {
        city: req.body.city,
        date: req.body.date,
        temperature: req.body.temperature,
        content: req.body.content
    }
    projectData.push(newData);
});

