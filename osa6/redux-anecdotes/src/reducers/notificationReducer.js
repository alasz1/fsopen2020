const initialState = {
    data: {
        message: "",
        anecdote: ""
    }
}

export const showNotification = (message, anecdote) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: {
            message: message,
            anecdote: anecdote
        }
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION',
        data: {
            message: "",
            anecdote: ""
        }
    }
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            console.log("action.data", { ...action.data })
            return { ...action.data }
        case 'HIDE_NOTIFICATION':
            console.log("action.data", { ...action.data })
            return { ...action.data }
        default:
            return state
    }
};

export default notificationReducer;