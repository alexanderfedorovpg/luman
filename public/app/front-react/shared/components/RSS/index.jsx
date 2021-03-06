import React from 'react'
import InlineSVG from 'components/InlineSVG'

import './style.scss'
import icon from './rss.svg'

function RSS() {
    return null

    return (
        <div className="rss header__rss">
            <a className="rss__link" href="javascript:void(0)">
                <span className="rss__text rss__float rss__float_left">RSS</span>
                <InlineSVG className="rss__img rss__float_right" src={icon} />
            </a>
        </div>
    )
}

export default RSS
