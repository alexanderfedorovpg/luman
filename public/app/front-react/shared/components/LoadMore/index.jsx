import React from 'react'

import RefreshIcon from 'components/Icon/Refresh'

import './style.scss'

function LoadMore({ children, onClick }) {

    return (
        <div className="more-goods">
            <a className="more-goods__link" onClick={onClick}>
                <RefreshIcon className="icon_more more-goods__icon" />
                <span className="more-goods__more-text more-text">
                    {children}
                </span>
            </a>
        </div>
    )
}

export default LoadMore
