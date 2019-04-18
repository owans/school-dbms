const express = require('express');
const mongoose = require('mongoose');
const teacherRouter = require('./router/teacherRouter');
const subjectRouter = require('./router/subjectRouter');
const port = 5050;

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/Olivet-DBMS')
    .then(()=>{
    console.log('Succesfully connected to mongodb');
}).catch((err)=>{
    console.log('An error occurred while trying to connect to the Olivet dbms', err);
})

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next)=>{
    const {url, method} = req;
    console.log(`Got a ${method} request for ${url} at ${new Date()}`);
    next();
})

app.use('/teacher', teacherRouter);
app.use('/subject', subjectRouter);

app.use((err, req, res, next) => {
    console.log('❌ we got an error', err);

    res.status(500).json({
        status: 'error',
        message: err.message
    })
})


app.listen(port, (err)=>{
    try{
        console.log(`Our server is listening on port: ${port}`);
    }catch(err){
        console.error(err)
    }
})