import React from 'react'
import classNames from 'classnames'

import { Link } from 'react-router-dom';

import MiniNews from 'components/MiniNews'
import ScissorsIcon from 'components/Icon/Scissors'

import './style.scss'

function Noise({ data, className }) {

    return (
        <div className={classNames('info-noize', className)}>
            <Link className="info-noize__title section-title" to='/noise'>
                Инфошум
            </Link>
            <ScissorsIcon />
            <div className="info-noize__wrapper">
                {data.slice(0, 5).map(value => (
                    <MiniNews data={value} key={value.id} className="info-noize__mini-news" />
                ))}
            </div>
        </div>
    )
}

export default Noise
