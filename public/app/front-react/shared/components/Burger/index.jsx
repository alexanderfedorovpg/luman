import React from 'react'
import classNames from 'classnames';

import './style.scss'

function Burger({toggle, active}) {

    return (
        <div onClick={toggle} className={classNames("burger header__burger", {'burger-active' : active})}>
            <div className="burger__element">
            </div>
        </div>
    )
}

export default Burger
