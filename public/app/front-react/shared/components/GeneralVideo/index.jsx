import React from 'react'
import classNames from 'classnames'

import './style.scss'
import logo from './purple-rtvi.png'

function Video({ className }) {

    return (
        <div className={classNames('general-video', className)}>
            <a className="general-video__link" href="javascript:void(0)"></a>
            <img className="general-video__img" src="/content/general-video/general-video.jpg" alt="" role="presentation" />
            <div className="general-video__info">
                <div className="general-video__date general-video__date general-video__date_position">
                    <img className="general-video__ico" src="/content/video-ico/video-ico.png" alt="" role="presentation" />
                    <span className="general-video__span">27 марта</span>
                </div>
                <div className="general-video__title">
                    Все ключевые события этого дня
                </div>
                <div className="general-video__logo">
                    <span className="general-video__logo-title">Today</span>
                    <img className="general-video__logo" src={logo} alt="" role="presentation" />
                </div>
            </div>
        </div>
    )
}

export default Video
