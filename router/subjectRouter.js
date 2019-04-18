const express = require('express');
const router = express.Router();
const SubjectModel = require('../SubjectModel');

//create subject
router.post('/subject', async function(req, res){
    try{

        const Subject = await SubjectModel.create(req.body);

        res.status(200).json({
            status: 'Success',
            data: Subject
        })
    }catch(err){
        console.log(err);

        res.status(500).json({
            status: 'error',
            message: "An error occured while entering a subject"
        })
    }
});

router.put('/:subject_name', async function(req,res){
    try{
            const updatedSubject = await SubjectModel
            .findOneAndUpdate({subject: req.params.subject_name}, 
                req.body, 
                {new: true});

                if(!updatedSubject){
                    res.status(404).json({
                        status: 'error',
                        message:   'update failed, subject not found'
                    })
                    return;        
                }

                res.json({
                    status: 'Success',
                    data: updatedSubject
                })

    }catch(err){
        console.log(err);

        res.json({
            status: 'error',
            message: 'Failed to update new subject'
        })
    }
})


router.delete('/:subject_name', async function(req, res){
    try{
        const deletedSubject = await SubjectModel
        .findOneAndDelete({subject: req.params.subject_name});

        if(!deletedSubject){
            res.status(404).json({
                status: 'error',
                message: 'Sorry you cannot delete a subject that does not exist'
            })
            return;
        }

        res.json({
            status: 'Success',
            message: 'Successfully deleted a subject'
        })

    }catch(err){
        console.log(err);

        res.status(500).json({
            status: 'error',
            message: 'An error occured while deleting a subject'
        })
    }
})

router.get('/', async function(req, res){
    
    try{

        const subject = await SubjectModel.find();
        res.json({
            status: 'Success',
            data: subject
        })

    }catch(err){
        console.log(err);

        res.status(200).json({
            status: 'error',
            message: 'An error occurred while trying to get subjects'
        })
    }
})

module.exports = router;