import React from 'react'
import LogoutTab from '../../components/LogoutTab'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CreateList from './CreateList'
import AllList from './AllLists'
import Loader from '../../components/Loader/Loader'
import bcrypt from 'bcryptjs'

import { getLists, clearErrors } from '../../redux/reducers/listReducer/list.action'

const List = () => {
    const dispatch = useDispatch()
    const reduxStore = useSelector((store) => store.listReducer)
    const userReducer = useSelector((store) => store.userReducer)

    const [lists, setLists] = useState([]);

    const navigate = useNavigate()


    useEffect(() => {

        if (userReducer.isAuthenticated) {
            dispatch(getLists(userReducer.user.user._id))
        }

        if (reduxStore.error) {
            alert(reduxStore.error)
            dispatch(clearErrors())
            navigate('/')
        }

        if (reduxStore.isSet) {
            setLists(reduxStore.lists)
        }
    }, [dispatch, reduxStore.error, navigate, userReducer.isAuthenticated])

    useEffect(() => {
        if (reduxStore.isSet) {
            // console.log(userReducer.user.user.secretCode)
            setLists(reduxStore.lists)
        }
    }, [dispatch, reduxStore.isSet])

    return (
        <>
            <LogoutTab />
            <div className="main__outer__box">
                {reduxStore.loading ? <Loader /> : (<AllList lists={lists} />)}
                <CreateList />
            </div>
        </>
    )
}

export default List