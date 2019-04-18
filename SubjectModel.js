const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    subject_name:{
        type: String,
        required: true
    },
    teacher:{
        type: String,
        required: true
    },
    term:{
        type: String,
        required: true
    }

});

const SubjectModel = mongoose.model('Subject', SubjectSchema);

module.exports = SubjectModel;