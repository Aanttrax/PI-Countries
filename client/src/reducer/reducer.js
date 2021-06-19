let initialState = {
    countries: [],
    countriesPage: [],
    country: []
};

const todos = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PAGE':
            return {
                ...state,
                countriesPage: action.payload
            }
        
        case 'GET_ALL':
            return {
                ...state,
                countries: action.payload
            }

        case 'GET_START':
            return state

        case 'GET_BY_ID':
            return {
                ...state,
                country: action.payload
            }

        case 'GET_BY_NAME':
            return {
                ...state,
                countriesPage: action.payload
            }

        default:
            return state
    }
}

export default todos;