import React from 'react'
import './MainPage.css'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

const MainPage = () => {

    const userReducer = useSelector((store) => store.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        if (userReducer.isAuthenticated) {
            navigate('/lists')
        }
    }, [navigate, userReducer.isAuthenticated])

    return (
        <>
            <div id="mainPage">
                <div className="main__page">
                    <div className="buttons">
                        <button onClick={() => window.location.href = '/register'}>Register</button>
                        <button onClick={() => window.location.href = '/login'}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage