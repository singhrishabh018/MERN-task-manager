const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  collaborators: [ 
     { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
  ], // Array to store IDs of collaborating users
  priority: {
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
}, {
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
