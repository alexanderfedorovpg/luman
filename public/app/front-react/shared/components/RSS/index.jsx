import React from 'react'
import InlineSVG from 'components/InlineSVG'

import './style.scss'
import icon from './rss.svg'

function RSS() {

    return (
        <div className="rss header__rss">
            <a className="rss__link" href="javascript:void(0)">
                <span className="rss__text rss__float rss__float_left">RSS</span>
            </a>
            <InlineSVG className="rss__img rss__float_right" src={icon} />
        </div>
    )
}

export default RSS
