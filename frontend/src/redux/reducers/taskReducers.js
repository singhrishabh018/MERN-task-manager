// taskReducer.js
const initialState = {
    tasks: [] // Assuming you store tasks in an array
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
        default:
            return state;
    }
};

export default taskReducer;
