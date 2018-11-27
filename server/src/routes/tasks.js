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

module.exports = router