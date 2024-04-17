// taskReducer.js
const initialState = {
    tasks: [] // Assuming you store tasks in an array
    priority: 'Medium' // Consider a default priority
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TASK': 
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'UPDATE_TASK':
            return { 
                ...state, 
                tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task)
            };
        case 'REMOVE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload)
                
            };
        case 'SET_TASK_PRIORITY':
            return {
                ...state,
                priority: action.payload
            };
        default:
            return state;
    }
};

export default taskReducer;
