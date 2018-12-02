const express = require('express')
const router = express.Router()
const Task = require('../models/task-model')

// Write
router.post('/tasks', (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description
  })
  task.save((err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send({
        success: true,
        message: 'Task with ID_' + data._id + ' saved successfully!'
      })
    }
  })
})

// Read
router.get('/tasks', (req, res) => {
  Task.find({}, 'title description', (err, posts) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ tasks: tasks })
    }
  }).sort({ _id: -1 })
})

module.exports = router