import React from 'react'

import Copyright from './Copyright'
import Menu from './Menu'
import Subscribe from './Subscribe'

import './style.scss'

function Footer() {

    return (
        <footer className="footer">
            <div className="footer__container container">
                <div className="footer__left-part">
                    <div className="logo-footer footer__logo-footer">
                        <img src="/content/logo-footer/logo-footer.png" alt="" role="presentation" />
                    </div>
                    <Copyright />
                </div>
                <div className="footer__middle-part">
                    <Menu className="footer__col-menu" />
                </div>
                <div className="footer__right-part">
                    <Subscribe className="footer__subscribe-networks" />
                </div>
            </div>
        </footer>
    )
}

export default Footer
