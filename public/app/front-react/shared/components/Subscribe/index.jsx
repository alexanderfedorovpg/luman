import React from 'react'
import classNames from 'classnames'

import './style.scss'

function Subscribe({ className }) {

    return (
        <div className={classNames('subscribe', className)}>
            <a className="subscribe__link" href="javascript:void(0)">
                <img className="subscribe__img" src="/content/subscribe/subscribe.png" alt="" role="presentation" />
            </a>
        </div>
    )
}

export default Subscribe
