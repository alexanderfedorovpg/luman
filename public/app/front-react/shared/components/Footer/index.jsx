import React from 'react'

import Copyright from './Copyright'
import Address from './Address'
import Subscribe from './Subscribe'
import Applications from './Applications'

import './style.scss'

function Footer() {

    return (
        <footer className="footer">
            <div className="footer__container container">
                <div className="footer__logo-wrapper">
                    <div className="logo-footer footer__logo-footer">
                        <img src="/content/logo-footer/logo-footer.png" alt="" role="presentation" />
                    </div>
                </div>
                <div className="footer__left-part">
                    <Copyright />
                </div>
                <div className="footer__middle-part">
                    <Address className="footer__address" />
                    <Applications className="footer__applications" />
                </div>
                <div className="footer__right-part">
                    <Subscribe className="footer__subscribe-networks" />
                </div>
            </div>
        </footer>
    )
}

export default Footer
