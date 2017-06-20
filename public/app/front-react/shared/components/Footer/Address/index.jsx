import React from 'react'
import classNames from 'classnames'

import './style.scss'


function Address({ className }) {

    return (
        <div className={classNames('address', className)}>
            <p className="address__text">
                Адрес редакции и учредителя:
                <br/>
                123022, г. Москва, ул. Рочдельская, д. 15, стр. 8
                <br/>
                Пресс-служба:
                <a href="mailto:nstepanov@rtvi.com" className="address__mail"> nstepanov@rtvi.com</a>
                <br/>
                <a href="tel:+1 202 568 27 62" className="address__phone">+1 202 568 27 62</a>
            </p>
        </div>
    )
}

export default Address
