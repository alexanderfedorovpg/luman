import React from 'react'

import logo from './logo.png'
import './style.scss'

function Logo() {

    return (
        <div className="logo header__logo">
            <a href="javascript:void(0)">
                <img className="logo__img" src={logo} />
            </a>
        </div>
    )
}

export default Logo
