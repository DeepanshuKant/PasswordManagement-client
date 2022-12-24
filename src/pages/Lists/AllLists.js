import React from 'react'
import classNames from 'classnames'
import { AiOutlineCopy } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import Swal from 'sweetalert2'
import bcrypt from 'bcryptjs'
import { useEffect, useState } from 'react'
import { deleteList, getLists, clearErrors } from '../../redux/reducers/listReducer/list.action'
import { useDispatch, useSelector } from 'react-redux'

import './List.css'
let CryptoJS = require("crypto-js");
// let CryptoJS = require("crypto-es");
const AllLists = ({ lists }) => {

    const [isModelShow, setIsModelShow] = useState(false);
    const [isOverlayShow, setIsOverlayShow] = useState(false);
    const [secretCodee, setSecretCodee] = useState('');
    const [passToReturn, setPassToReturn] = useState('');

    const dispatch = useDispatch()
    const reduxStore = useSelector((store) => store.listReducer)
    const userReducer = useSelector((store) => store.userReducer)

    function deleteHandler(id) {
        dispatch(deleteList(id))

    }

    useEffect(() => {

        if (reduxStore.error) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${reduxStore.error}`,
            })


            dispatch(clearErrors())
        }

        if (reduxStore.isDeleted) {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
            dispatch(getLists(userReducer.user.user._id))
        }
    }, [dispatch, reduxStore.isDeleted, reduxStore.error])


    //To change the password to asterisks
    function changePassword(pass) {

        pass = pass.replace(/./g, '*')

        return pass;

    }

    //To copy the password to clipboard
    function passHandler(pass) {

        setIsModelShow(!isModelShow);
        setIsOverlayShow(!isOverlayShow);
        setPassToReturn(pass);

    }

    async function doTheOperation() {

        let isMatched = await bcrypt.compare(secretCodee, userReducer.user.user.secretCode)

        if (isMatched) {

            var bytes = CryptoJS.AES.decrypt(passToReturn, userReducer.user.user.secretCode);
            var originalText = bytes.toString(CryptoJS.enc.Utf8);

            navigator.clipboard.writeText(originalText);

            Swal.fire('Copied!', 'Password Copied.', 'success')
            setSecretCodee('')
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Wrong Secret Key',
            })
            setSecretCodee('')
        }

    }

    // if (chances === 0) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'You have exceeded the chances',
    //     })

    //     const userResp = axios.delete(`http://localhost:4000/api/v1/user/delete/${userReducer.user.user._id}`)
    //     // const userResp = axios.delete(`http://localhost:4000/api/v1/user/delete/${"sadasdsd"}`)

    //     userResp.then((res) => {
    //         return res.data;
    //     })
    //         .then((data) => {
    //             if (data.success) {
    //                 localStorage.clear();
    //                 window.location.href = '/'
    //             }
    //         })

    //     setIsModelShow(false);
    //     setIsOverlayShow(false);
    //     setChances(3);

    // }



    //To close the model
    const changeModal = () => {
        setIsModelShow(false);
        setIsOverlayShow(false);
    }


    return (
        <>
            <div className="lists__main__parent">
                {lists.map((list) => {
                    return (
                        <div key={list._id} className='list__parent__box' >
                            <a href={`https://www.${list.category}.com`} target="_blank" style={{ textDecoration: 'none' }}><p className={classNames({ 'facebook': list.category === 'Facebook' }, { 'google': list.category === 'Google' }, { 'instagram': list.category === 'Instagram' })} >{list.category}</p></a>
                            <h1 className='list__title'><span>userID:</span>
                                <br />
                                {list.id}</h1>
                            {/* <div className="pass_field" onClick={(e) => passHandler(list.password)} > */}
                            <div className="pass_field" onClick={(e) => passHandler(list.password)} >
                                {/* */}
                                <p className='list__desc' >{changePassword(list.password)}</p>
                                <span className='pass_show' ><AiOutlineCopy /></span>
                            </div>

                            <p className='list__created' >{String(list.createdAt).substr(0, 10)}</p>

                            <button className='list__delete' onClick={(e) => deleteHandler(list._id)}>Delete</button>


                        </div>
                    )
                })}

                {/* Modal Here */}
                <div className={classNames("secret__modal", { "secret__modal__changed": isModelShow })}>
                    <span onClick={(e) => changeModal()} ><ImCross /></span>
                    {/* <p className='secret__chance' >Chances Left: {chances}</p> */}
                    <input type="password" placeholder='Enter Secret Code' required value={secretCodee} onChange={(e) => setSecretCodee(e.target.value)} id="secretIput" />

                    <button className="copy__btn" onClick={(e) => doTheOperation()} >Copy</button>
                </div>

                <div className={classNames("overlay", { "overlay__changed": isOverlayShow })}></div>

            </div>



        </>
    )
}

export default AllLists