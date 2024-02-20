const Workout = require('../models/workoutModel') //import the model
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1}) //get all documents, sort in decensding order by createdAt date

    res.status(200).json(workouts) //send back all workouts
}

//get single workout
const getOneWorkout = async (req, res) => {
    const {id} = req.params //get id from route parameters

    if(!mongoose.Types.ObjectId.isValid(id)) { //make sure id is valid
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

//create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = [] 

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) { //if there are empty fields
        //return error with message and empty fields
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }
    
    try {
        //create new document with properties from req body
        const workout = await Workout.create({title, load, reps}) //this is async
        //send response (always send code), send document in json
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({erorr: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id}) //find by id mongoDB is _id

    if(!workout) {
        return res.status(400).json({erorr: 'No such workout'})
    }

    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({erorr: 'No such workout'})
    }
    //find by id and update
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body //update using req whole body
    })

    if(!workout) {
        return res.status(400).json({erorr: 'No such workout'})
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getOneWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}