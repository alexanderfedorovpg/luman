import React from 'react'
import classNames from 'classnames'

import './style.scss'


function Address({ className }) {

    return (
        <div className={classNames('address', className)}>
            <p className="address__text">
                Адрес редакции и учредителя:
                <span className="br"> 123022, г. Москва, ул. Рочдельская, д. 15, стр. 8</span>
                <span className="br br_no-inline"></span>
                <span className="br"> Пресс-служба: <a href="mailto:nstepanov@rtvi.com" className="address__mail"> nstepanov@rtvi.com </a></span>
                <span className="br"></span>
                <a href="tel:+1 202 568 27 62" className="address__phone"> +1 202 568 27 62</a>
            </p>
        </div>
    )
}

export default Address
