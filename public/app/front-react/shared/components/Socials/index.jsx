import React from 'react'

import share from './img/share.png'

import './style.scss'

function Socials() {

    return (
        <div className="social-links social-links--vertical social-links--pad">
            <a href="#" className="social-links__ico-link social-links__share">
                <img src={share} className="social-links__ico-image" />
            </a>
        </div>
    )
}

export default Socials
