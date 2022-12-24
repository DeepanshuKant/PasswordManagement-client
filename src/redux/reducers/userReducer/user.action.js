import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from './user.type'
import axios from 'axios';



export const loginUser = ({ details }) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST })
        const response = await axios.post('http://localhost:4000/api/v1/user/login', details, { withCredentials: true, credentials: 'include', headers: { 'Content-Type': 'application/json' } });
        // const response = await axios.post('http://localhost:4000/api/v1/user/login', details, { withCredentials: true });

        return dispatch({ type: LOGIN_SUCCESS, payload: response.data });

    } catch (error) {
        return dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
}

export const registerUser = ({ details }) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST })

        const response = await axios.post('http://localhost:4000/api/v1/user/register', details, { withCredentials: true, credentials: 'include', headers: { 'Content-Type': 'application/json' } });
        // const response = await axios.post('http://localhost:4000/api/v1/user/register', details, { withCredentials: true });

        dispatch({ type: REGISTER_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}