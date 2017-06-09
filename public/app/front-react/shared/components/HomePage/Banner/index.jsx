import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom';

import './style.scss'

function Banner({ className }) {

    return (
        <div className={classNames('banner banner__where-view', className)}>
            <Link to='/how' className="banner__link">
                <div className="banner__title">
                    Как смотреть RTVI
                </div>
                <div className="banner__subtitle">
                    По обе стороны
                </div>
            </Link>
        </div>
    )
}

export default Banner
