const mongoose = require('mongoose') //mongoDB has no schemas, make schemas with mongoose

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true}) //another argument, add timestamp when document gets created

module.exports = mongoose.model('Workout', workoutSchema) //create and export the model with schema

//schema defines structure, model is used to access collection
