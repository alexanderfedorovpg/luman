import React from 'react'

import InlineSVG from 'components/InlineSVG'

import icon from './more.svg'
import './style.scss'

function LoadMore({ children, onClick }) {

    return (
        <div className="more-goods">
            <a className="more-goods__link" onClick={onClick}>
                <InlineSVG src={icon} className="icon icon_more icon more-goods__icon" />
                <span className="more-goods__more-text more-text">
                    {children}
                </span>
            </a>
        </div>
    )
}

export default LoadMore
