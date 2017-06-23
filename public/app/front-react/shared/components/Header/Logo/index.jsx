import React from 'react'
import { Link } from 'react-router-dom'


const logo = '/content/logo/logo.svg'
const logoWar = '/content/logo/logo-war.svg'

import './style.scss'

function Logo({ war }) {

    return (
        <div className="logo header__logo">
            <Link to="/">
                <img className="logo__img" src={war ? logoWar : logo} />
            </Link>
        </div>
    )
}

export default Logo
