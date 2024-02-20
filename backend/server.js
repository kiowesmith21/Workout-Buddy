require('dotenv').config() //require dotenv to get env variables

const express = require('express') //require express (import)
const mongoose = require('mongoose') //import mongoose
const workoutRoutes = require('./routes/workouts') //get the workout routes

//create express app in "app" const
const app = express()

//middleware
app.use(express.json()) //needed for sending data to server

app.use((req, res, next) => { //have to invoke next function
    console.log(req.path, req.method) //log the route path and the method (GET,POST, etc)
    next()
})

//routes, gets all of the routes from the router
app.use('/api/workouts', workoutRoutes) //set the route path prefix 

//connect to DB
mongoose.connect(process.env.MONGO_URI) //returns a promise, add error handling
    .then(() => {
        //listen for requests on port 4000 (from .env), then console.log
        app.listen(process.env.PORT, () => {
        console.log('connected to DB & listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })



