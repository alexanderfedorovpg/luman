import React from 'react'
import classNames from 'classnames'

import './style.scss'

import apple from './app-images/app-apple.png'
import android from './app-images/app-android.png'

const appleUrl = 'https://itunes.apple.com/ph/app/rtvi/id1222310129?mt=8'
const androidUrl = 'https://play.google.com/store/apps/details?id=com.rtvi.mobile'

function Applications({ className }) {

    return (
        <div className={classNames('applications', className)}>
           <p className="applications__title">Приложения RTVI</p>
            <div className="applications__links">
                <div className="applications__item">
                    <a href={appleUrl} className="applications__link" target="_blank">
                        <img src={apple} alt="" className="applications__ico"/>
                    </a>
                </div>
                <div className="applications__item">
                    <a href={androidUrl} className="applications__link" target="_blank">
                        <img src={android} alt="" className="applications__ico"/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Applications
