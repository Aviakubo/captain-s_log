// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Log = require('./models/logs.js');


// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));

// ROUTES
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// Index - display all books
app.get('/logs', (req, res) => {
	Log.find({}, (error, allLogs) => {
		res.render('index.ejs', {
			logs: allLogs,
		});
	});
});

// New - display form to add a new book
app.get('/logs/new', (req, res) => {
	res.render('new.ejs');
});

// Delete - delete a single book

// Update - update a single book

// Create - create a new book
app.post('/logs', (req, res) => {
	if (req.body.completed === 'on') {
		//if checked, req.body.completed is set to 'on'
		req.body.completed = true;
	} else {
		//if not checked, req.body.completed is undefined
		req.body.completed = false;
	}

    Log.create(req.body, (error, createdLog) => {
        res.redirect('/logs');
    });
});

// Edit - display form to update a book

// Show - display a single book
app.get('/logs/:id', (req, res) => {
	Log.findById(req.params.id, (err, foundLog) => {
		res.render('show.ejs', {
			log: foundLog,
		});
	});
});

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));