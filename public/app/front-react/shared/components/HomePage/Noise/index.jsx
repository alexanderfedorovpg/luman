import React from 'react'
import classNames from 'classnames'

import MiniNews from 'components/MiniNews'

import './style.scss'

function Noise({ data, className }) {

    return (
        <div className={classNames('info-noize', className)}>
            <p className="info-noize__title section-title">
                Инфошум
            </p>
            <div className="info-noize__wrapper">
                {data.map(value => (
                    <MiniNews data={value} key={value.Id} className="info-noize__mini-news" />
                ))}
            </div>
        </div>
    )
}

export default Noise
