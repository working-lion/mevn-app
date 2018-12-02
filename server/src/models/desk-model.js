const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchemaOfDesk = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
})

const TaskListSchemaOfDesk = new Schema({
  title: {
    type: String,
    required: true
  },
  list: [TaskSchemaOfDesk]
})

const DeskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  list: [TaskListSchemaOfDesk]
})

const DeskModel = mongoose.model('desks', DeskSchema)
module.exports = DeskModel