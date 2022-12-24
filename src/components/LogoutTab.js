

import React, { useEffect } from 'react'
import './Logout.css'
import axios from 'axios'
import Swal from 'sweetalert2'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const LogoutTab = () => {

    const userReducer = useSelector((store) => store.userReducer)
    const listReducer = useSelector((store) => store.listReducer)

    async function logoutNow() {

        try {
            const response = await axios.get(`https://todo-appbackend.herokuapp.com/api/v1/user/logout`, { withCredentials: true, credentials: 'include' })

            if (response.status === 200) {
                window.localStorage.clear();
                // alert('Logged out successfully')
                Swal.fire('Logged out successfully')
                window.location.href = "/"
            }
        } catch (error) {
            // alert(error.message)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.message}`,
            })

        }
    }

    return (
        <>

            <div id="logout">
                <div className="main__logout">

                    <div className="pass_total">
                        <h3>Total: {listReducer.lists ? listReducer.lists.length : 0}</h3>
                    </div>

                    <div className="logout_container">
                        <div className="user__name">Hey! {userReducer.user.user.name}</div>
                        <button onClick={logoutNow} >Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogoutTab