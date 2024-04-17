// taskActions.js
export const addTask = (task) => ({ type: 'ADD_TASK', payload: task });
export const updateTask = (task) => ({ type: 'UPDATE_TASK', payload: task });
export const removeTask = (taskId) => ({ type: 'REMOVE_TASK', payload: taskId });
export const setTaskPriority = (priority) => ({
    type: 'SET_TASK_PRIORITY',
    payload: priority // 'Low', 'Medium', 'High' 
});
