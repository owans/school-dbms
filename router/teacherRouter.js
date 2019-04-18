const express = require('express');
const router = express.Router();
const TeacherModel = require('../TeacherModel');
const bcrypt = require('bcrypt');

//create teachers
router.post('/teacher', async function(req, res){
    try{
        //hash password using bcrypt
        req.body.password = await bcrypt.hash(req.body.password, 10);

        const Teacher = await TeacherModel.create(req.body);

        res.status(200).json({
            status: 'Success',
            data: Teacher
        })
    }catch(err){
        console.log(err);

        res.status(500).json({
            status: 'error',
            message: "An error occured while creating your account"
        })
    }
});

router.put('/:email', async function(req,res){
    try{
            const updatedTeacher = await TeacherModel
            .findOneAndUpdate({email: req.params.email}, 
                req.body, 
                {new: true});

                //check if the teacher was found and updated
                if(!updatedTeacher){
                    res.status(404).json({
                        status: 'error',
                        message:   'update failed, teacher not found'
                    })
                    return;        
                }

                res.json({
                    status: 'Success',
                    data: updatedTeacher
                })

    }catch(err){
        console.log(err);

        res.json({
            status: 'error',
            message: 'Failed to update new information'
        })
    }
})


router.delete('/:email', async function(req, res){
    try{
        const deletedTeacher = await TeacherModel
        .findOneAndDelete({email: req.params.email});

        if(!deletedTeacher){
            res.status(404).json({
                status: 'error',
                message: 'Sorry you cannot delete a record that does not exist'
            })
            return;
        }

        res.json({
            status: 'Success',
            message: 'Successfully deleted a teacher\'s account'
        })

    }catch(err){
        console.log(err);

        res.status(500).json({
            status: 'error',
            message: 'An error occured while deleting a teacher'
        })
    }
})

router.get('/', async function(req, res){
    
    try{
        const search = req.query.gender ? {gender: req.query.gender} : {};

        const teachers = await TeacherModel.find(search);
        res.json({
            status: 'Success',
            data: teachers
        })

    }catch(err){
        console.log(err);

        res.status(200).json({
            status: 'error',
            message: 'An error occurred while trying to get an account'
        })
    }
})

module.exports = router;