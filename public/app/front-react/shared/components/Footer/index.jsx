import React from 'react'
import MediaQuery from 'react-responsive'

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
                    <MediaQuery minWidth="930px">
                        <Applications className="footer__applications" />
                    </MediaQuery>
                    <MediaQuery maxWidth="614px">
                        <Applications className="footer__applications" />
                    </MediaQuery>
                </div>
                <div className="footer__right-part">
                    <MediaQuery minWidth="615px" maxWidth="929px">
                        <Applications className="footer__applications" />
                    </MediaQuery>
                    <Subscribe className="footer__subscribe-networks" />
                </div>
            </div>
        </footer>
    )
}

export default Footer
