
import { LIST_REQUEST, LIST_SUCCESS, LIST_FAIL, CLEAR_ERRORS, CREATE_LIST_REQUEST, CREATE_LIST_SUCCESS, CREATE_LIST_FAIL, DELETE_LIST_REQUEST, DELETE_LIST_SUCCESS, DELETE_LIST_FAIL } from './list.type'


const initialState = {
    lists: []
}


const listReducer = (state = initialState, action) => {

    switch (action.type) {
        case LIST_REQUEST:
            return {
                loading: true,
                isSet: false,
                lists: [],
            }

        case LIST_SUCCESS:
            return {
                loading: false,
                isSet: true,
                lists: action.payload,
            }

        case LIST_FAIL:
            return {
                loading: false,
                isSet: false,
                error: action.payload,
                lists: null
            }

        case CREATE_LIST_REQUEST:
            return {
                loading: true,
                isCreated: false,
                ...state
            }

        case CREATE_LIST_SUCCESS:
            return {
                loading: false,
                isCreated: true,
                lists: action.payload,
            }

        case CREATE_LIST_FAIL:
            return {
                loading: false,
                isCreated: false,
                error: action.payload,
                ...state
            }

        case DELETE_LIST_REQUEST:
            return {
                loading: true,
                isDeleted: false,
            }

        case DELETE_LIST_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload,
            }

        case DELETE_LIST_FAIL:
            return {
                loading: false,
                isDeleted: false,
                error: action.payload,
                ...state
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }

}

export default listReducer;