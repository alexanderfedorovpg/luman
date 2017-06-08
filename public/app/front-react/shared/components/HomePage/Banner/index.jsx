import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom';

import './style.scss'

function Banner({ className }) {

    return (
        <Link to='/how' className={classNames('banner banner__where-view', className)}>
            <div className="banner__title">
                Как смотреть RTVI
            </div>
            <div className="banner__subtitle">
                По обе стороны
            </div>
        </Link>
    )
}

export default Banner
