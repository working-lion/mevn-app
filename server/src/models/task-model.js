const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  created: {
    type: Date
  }
})

const TaskModel = mongoose.model('tasks', TaskSchema)
module.exports = TaskModel