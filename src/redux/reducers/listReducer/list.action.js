import { LIST_REQUEST, LIST_SUCCESS, LIST_FAIL, CLEAR_ERRORS, CREATE_LIST_REQUEST, CREATE_LIST_SUCCESS, CREATE_LIST_FAIL, DELETE_LIST_REQUEST, DELETE_LIST_SUCCESS, DELETE_LIST_FAIL } from './list.type'

import axios from 'axios'
export const getLists = (id) => async (dispatch) => {

    try {
        dispatch({ type: LIST_REQUEST })

        const response = await axios.get(`https://password-management-server.onrender.com/api/v1/password/${id}`);
        // const response = await axios.get(`http://localhost:4000/api/v1/password`);

        dispatch({ type: LIST_SUCCESS, payload: response.data });

    } catch (error) {
        // console.log(error)
        dispatch({ type: LIST_FAIL, payload: error.response.message })
    }
}

export const createList = (id, { details }) => async (dispatch) => {

    try {
        dispatch({ type: CREATE_LIST_REQUEST })

        const response = await axios.post(`https://password-management-server.onrender.com/api/v1/password/new/${id}`, details)

        dispatch({ type: CREATE_LIST_SUCCESS, payload: response.data })

    } catch (error) {
        dispatch({ type: CREATE_LIST_FAIL, payload: error.response.message })
    }
}


export const deleteList = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_LIST_REQUEST })

        const reponse = await axios.delete(`https://password-management-server.onrender.com/api/v1/password/delete/${id}`)
        dispatch({ type: DELETE_LIST_SUCCESS, payload: reponse.data.success })

    } catch (error) {
        dispatch({ type: DELETE_LIST_FAIL, payload: error.response.message })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}