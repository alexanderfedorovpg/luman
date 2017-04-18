import React from 'react'
import classNames from 'classnames'

import './style.scss'

function BannerPreview({ className }) {

    return (
        <div className={classNames('banner-preview', className)}>
            <img className="banner-preview__img" src="/content/banner/banner.png" alt="" role="presentation" />
            <div className="banner-preview__left-part">
                <p className="banner-preview__title-group">
                    RTVI
                </p>
                <p className="banner-preview__subtitle-group">
                    Наши эфиры
                </p>
            </div>
            <div className="banner-preview__right-part">
                <div className="banner-preview__wrapper">
                    <div className="banner-preview__part-title">
                        <p className="banner-preview__title-programm">
                            Тайм код: итоги недели
                        </p>
                        <p className="banner-preview__subtitle-programm">
                            С Владимиром Ленским
                        </p>
                    </div>
                    <div className="banner-preview__delimeter banner-preview__delimeter banner-preview__delimeter_one">
                        <img src="/content/banner/delimeter.png" alt="" role="presentation" />
                    </div>
                    <div className="banner-preview__part-time banner-preview__part-time banner-preview__part-time_one">
                        <p className="banner-preview__programm-title">
                            По субботам
                        </p>
                        <p className="banner-preview__programm-time">
                            19:00
                        </p>
                    </div>
                    <div className="banner-preview__delimeter banner-preview__delimeter banner-preview__delimeter_two">
                        <img src="/content/banner/delimeter.png" alt="" role="presentation" />
                    </div>
                    <div className="banner-preview__part-time">
                        <p className="banner-preview__programm-title">
                            По воскресеньям
                        </p>
                        <p className="banner-preview__programm-time">
                            11:00
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BannerPreview
