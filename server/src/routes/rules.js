const express = require('express')
const router = express.Router()

// models
const Post = require('../models/post-model')
//const Task = require('../models/task-model')
const Desk = require('../models/desk-model')

/* ============ Desks ============ */

// Read
router.get('/desks', (req, res) => {
  Desk.find({}, 'title description list').populate('list').exec((err, desks) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ desks: desks})
    }
  })
  //.sort({ _id: -1 })
})

// Read by id
router.get('/desks/:id', (req, res) => {
  let deskId = req.params.id;

  Desk.findById(deskId, 'title description list', (err, desk) => {
    /*if (err) {
      res.sendStatus(500)
    } else {
      res.json(desk)
    }*/
    if (err) {
      res.send({
        success: false,
        error: err
      });
    } else {
      res.send({
        success: true,
        desk: desk
      })
    }
  })
})

// Read by id
/*router.get('/desks/:descId/:taskId', (req, res) => {
  let deskId = req.params.descId;
  let taskId = req.params.taskId;

  Desk.findById(deskId, 'title', (err, desk) => {
    if (err) {
      res.sendStatus(500)
    } else {
      let task = desk.list.id(taskId);
      res.JSON(task);
    }
  })
})*/

// Write
router.post('/desks', (req, res) => {
  const desk = new Desk({
    title: req.body.title,
    list: req.body.list
  })
  desk.save((err, data) => {
    if (err) {
      res.send({
        success: false,
        error: err
      });
    } else {
      res.send({
        success: true,
        _id: data._id
      })
    }
  })
})

// Write task
/*TODO: тут нужно добавлять задачу по id списка*/
router.post('/desks/addTask', (req, res) => {
  const task = new Task({
    title: req.body.title
  })
  task.save((err, data) => {
    if (err) {
      res.send({
        success: false,
        error: err
      });
    } else {
      res.send({
        success: true,
        _id: data._id
      })
    }
  })
})

// Delete
router.delete('/desks/:id', (req, res) => {
  Desk.remove({ _id: req.params.id }, err => {
    if (err) {
      res.send({
        success: false,
        error: err
      });
    } else {
      res.send({
        success: true
      })
    }
  })
})

/* ============ Tasks ============ */

// Write
/*router.post('/tasks', (req, res) => {
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
  Task.find({}, 'title', (err, tasks) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ tasks: tasks })
    }
  }).sort({ _id: -1 })
})

// Read
router.get('/tasks/:id', (req, res) => {
  let taskId = req.params.id;

  Task.findById(taskId, 'title', (err, task) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ task: task })
    }
  }).sort({ _id: -1 })
})*/


/* ============ Posts ============*/

// Read
router.get('/posts', (req, res) => {
  Post.find({}, 'title description', (err, posts) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ posts: posts })
    }
  }).sort({ _id: -1 })
})

// Write
router.post('/posts', (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  })
  post.save((err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send({
        success: true,
        message: 'Post with ID_' + data._id + ' saved successfully!'
      })
    }
  })
})

// Read by id
router.get('/posts/:id', (req, res) => {
  Post.findById(req.params.id, 'title description', (err, post) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(post)
    }
  })
})

// Update by id
router.put('/posts/:id', (req, res) => {
  Post.findById(req.params.id, 'title description', (err, post) => {
    if (err) {
      console.log(err)
    } else {
      if (req.body.title) {
        post.title = req.body.title
      }
      if (req.body.description) {
        post.description = req.body.description
      }
      post.save(err => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.sendStatus(200)
        }
      })
    }
  })
})

// Delete
router.delete('/posts/:id', (req, res) => {
  Post.remove({ _id: req.params.id }, err => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = router