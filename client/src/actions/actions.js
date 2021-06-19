import axios from 'axios';

const GET_PAGE = 'GET_PAGE';
const GET_START = 'GET_START';
const GET_BY_ID = 'GET_BY_ID';
const GET_ALL = 'GET_ALL';
const GET_BY_NAME = 'GET_BY_NAME';

const getPage = (page, sort) => {
    return async (dispatch) => {
        const resp = await axios.get('http://localhost:3001/api/countries?page=' + page + '&sort=' + sort)
        dispatch({type: GET_PAGE, payload: resp.data})
    }
};

const getByName = (name, region, activity, justName) => {
    return async (dispatch) => {
        let resp = await axios.get('http://localhost:3001/api/countries?page=all')

        if (name) {
            resp = await axios.get('http://localhost:3001/api/countries?name=' + name);
        }

        if (region) {
            Array.isArray(resp.data) && (resp.data = resp.data.filter(c => c.region === region))
        }

        if (activity) {
            Array.isArray(resp.data) && (resp.data = resp.data.filter(c =>c.activities.filter(a => a.name === activity).length))
        }

        if (justName) {
            Array.isArray(resp.data) && (resp.data = resp.data.map(c => c.name))
        }

        dispatch({type: GET_BY_NAME, payload:resp.data})
    }
};

const getAll = () => {
    return async (dispatch) => {
        const resp = await axios.get('http://localhost:3001/api/countries?page=all')
        dispatch({type: GET_ALL, payload:resp.data}) 
    }
};

const getStart = () => {
    return async () => {
        const resp = await axios.get('http://localhost:3001/api/countries')
        return {type: GET_START, payload: resp.data}
    }
};

const getById = (id) => {
    return async (dispatch) => {
        const resp = await axios.get('http://localhost:3001/api/countries/' + id)
        dispatch({type: GET_BY_ID, payload: resp.data})
    }
}

export { getPage, getByName, getAll, getStart, getById };