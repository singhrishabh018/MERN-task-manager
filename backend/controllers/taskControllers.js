const Task = require("../models/Task");
const { validateObjectId } = require("../utils/validation");


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({ tasks, status: true, msg: "Tasks found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.getTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    const task = await Task.findOne({ user: req.user.id, _id: req.params.taskId });
    if (!task) {
      return res.status(400).json({ status: false, msg: "No task found.." });
    }
    res.status(200).json({ task, status: true, msg: "Task found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.postTask = async (req, res) => {
  try {
    const { description, priority } = req.body;
    if (!description) {
      return res.status(400).json({ status: false, msg: "Description of task not found" });
    }

    // Validation for priority (Assuming 'Low', 'Medium', 'High')
    const allowedPriorities = ['Low', 'Medium', 'High']; 
    if (!allowedPriorities.includes(priority)) {
      return res.status(400).json({ status: false, msg: "Invalid priority value" }); 
    }

    const task = await Task.create({ user: req.user.id, description, priority });
    io.emit('task-created', task); 
    res.status(200).json({ task, status: true, msg: "Task created successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.putTask = async (req, res) => {
  try {
    const { description, priority } = req.body;
    // ... your existing validation code (validateObjectId)

    const allowedPriorities = ['Low', 'Medium', 'High']; 
    if (priority && !allowedPriorities.includes(priority)) {
      return res.status(400).json({ status: false, msg: "Invalid priority value" }); 
    }

    // Existing task fetch and authorization checks... 
    let task = await Task.findById(req.params.taskId);
    // ... your existing code

    // Update both description and priority (if a priority value is provided)
    task = await Task.findByIdAndUpdate(req.params.taskId, { description, priority }, { new: true }); 

    io.emit('task-updated', task); 
    res.status(200).json({ task, status: true, msg: "Task updated successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}


exports.deleteTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    if (task.user != req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't delete task of another user" });
    }

    await Task.findByIdAndDelete(req.params.taskId);
    // Emit a Socket.IO event
    io.emit('task-deleted', task);
    res.status(200).json({ status: true, msg: "Task deleted successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}
