import React from 'react'
import classNames from 'classnames'

import FromEnter from '../FromEnter'

import './style.scss'

function MoreVideo({ data, className }) {

    return (
        <div className={classNames('more-video more-video__no-border', className)}>
            <div className="more-video__title section-title">
                Из эфира
            </div>
            <div className="more-video__list">
                {data.map(value => (
                    <FromEnter className="more-video__from-enter" key={value.Id} data={value} />
                ))}
            </div>
        </div>
    )
}

export default MoreVideo
