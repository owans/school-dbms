const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    subject:{
        type: String,

    },

    class:{
        type: String,
        
    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    phone_nos:{
        type: Number,
        required: true
    },
    lga:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    }
    
});

const TeacherModel = mongoose.model('Teacher', TeacherSchema);

module.exports = TeacherModel;