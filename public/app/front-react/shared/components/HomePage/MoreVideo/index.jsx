import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom';

import FromEnter from 'components/Broadcast/Item'

import './style.scss'

function MoreVideo({ data, className }) {

    return (
        <div className={classNames('more-video more-video__no-border', className)}>
            <div className="more-video__title section-title">
                <Link to='/broadcast'>
                    Из эфира
                </Link>
            </div>
            <div className="more-video__list">
                {data.map(value => (
                    <FromEnter className="more-video__from-enter" key={value.id} data={value} />
                ))}
            </div>
        </div>
    )
}

export default MoreVideo
