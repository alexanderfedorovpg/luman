import React from 'react'
import classNames from 'classnames'

import './style.scss'

function Banner({ className }) {

    return (
        <div className={classNames('banner banner__where-view', className)}>
            <div className="banner__title">
                Как смотреть RTVI
            </div>
            <div className="banner__subtitle">
                По обе стороны
            </div>
        </div>
    )
}

export default Banner
