const mongoose = require('mongoose');

const emailtemplateSchema = mongoose.Schema({
    name: String,
    header: String,
    body: String,
    cssFile: String
});

module.exports = mongoose.model('template', emailtemplateSchema);