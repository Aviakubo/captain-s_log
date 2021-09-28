const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
	title: { type: String },
	entry: { type: String },
	shipIsBroken: Boolean,
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;