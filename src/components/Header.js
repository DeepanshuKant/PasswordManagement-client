import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'
const Header = () => {
    return (
        <>
            <div className="main__header">
                <div className="header_bar">
                    <h1><Link to="/" >Password Manager</Link> </h1>
                </div>

                {/* <div className="nav__bar">
                    <ul>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </div> */}
            </div>
        </>
    )
}

export default Header