import React from 'react'
import classNames from 'classnames'

import './style.scss'

import apple from './app-images/app-apple.png'
import android from './app-images/app-android.png'

function Applications({ className }) {

    return (
        <div className={classNames('applications', className)}>
           <p className="applications__title">Приложения RTVI</p>
            <div className="applications__links">
                <div className="applications__item">
                    <a href="javascript:void(0)" className="applications__link" target="_blank">
                        <img src={apple} alt="" className="applications__ico"/>
                    </a>
                </div>
                <div className="applications__item">
                    <a href="https://play.google.com/store/apps/details?id=com.rtvi.mobile" className="applications__link" target="_blank">
                        <img src={android} alt="" className="applications__ico"/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Applications
