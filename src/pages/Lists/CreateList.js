import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { createList, clearErrors } from '../../redux/reducers/listReducer/list.action'
import Swal from 'sweetalert2'

import { getLists } from '../../redux/reducers/listReducer/list.action'
import './List.css'

let CryptoJS = require("crypto-js");

const CreateList = () => {

    const dispatch = useDispatch()
    const userRedux = useSelector((store) => store.userReducer)
    const reduxStore = useSelector((store) => store.listReducer)
    const [idd, setIdd] = useState('');
    const [passwordd, setPasswordd] = useState('');
    const [categoryy, setCategoryy] = useState('Google');



    function clearFields() {
        setIdd('')
        setPasswordd('')
        setCategoryy('Google')
    }

    const createNew = (e) => {
        e.preventDefault();

        let cipherText = CryptoJS.AES.encrypt(passwordd, userRedux.user.user.secretCode).toString();
        // setPasswordd(cipherText);
        const details = {
            id: idd,
            password: cipherText,
            category: categoryy,
        }
        // console.log(cipherText);
        dispatch(createList(userRedux.user.user._id, { details }))
        clearFields();
    }

    useEffect(() => {

        if (reduxStore.error) {
            // alert(reduxStore.error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${reduxStore.error}`,
            })

            dispatch(clearErrors())
        }

        if (reduxStore.isCreated) {
            // alert('Password Saved')

            Swal.fire('Successfull!', 'Password Saved', 'success')

            dispatch(getLists(userRedux.user.user._id))
        }


    }, [dispatch, alert, reduxStore.isCreated, reduxStore.isCreated, reduxStore.error])

    return (

        <>
            <div className="create__list__parent">
                <div className="create__list">
                    <h1>Secure New Password</h1>
                    <form onSubmit={createNew}>
                        <input type="text" placeholder='Enter ID' required value={idd} onChange={(e) => setIdd(e.target.value)} />
                        <input type="password" placeholder='Enter Password' required value={passwordd} onChange={(e) => setPasswordd(e.target.value)} />
                        <div className="forPriority">
                            <label htmlFor="Select_Priority" ></label>
                            <select id="Select_Priority" value={categoryy} onChange={(e) => setCategoryy(e.target.value)}>
                                <option value="Google">Google</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Instagram">Instagram</option>
                            </select>
                        </div>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateList