const initialState = {
    data: {
        filter: ""
    }
}


export const filterChange = (filter) => {
    return {
        type: 'FILTER_CHANGE',
        data: filter
    }
}


const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER_CHANGE':
            const newData = { ...state, data: action.data}
            console.log("concat to data", newData)
            return newData
        default:
            return state
    }
};

export default filterReducer;