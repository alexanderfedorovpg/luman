import React from 'react'
import classNames from 'classnames'
import { FormattedDate } from 'react-intl'

import './style.scss'

function ListVideo({ data, className }) {

    return (
        <div className={classNames('list-video', className)}>
            {data.map(value => (
                <div key={value.Id} className="list-video__item">
                    <img className="list-video__ico-play" src="/content/video-ico/video-ico-blue.png" alt="" role="presentation" />
                    <div className="list-video__info">
                        <a className="list-video__title" href="javascript:void(0)">
                            {value.Title}
                        </a>
                        <p className="list-video__category">
                            {`${value.category} `}
                            <span className="list-video__time-add">
                                {Date.parse(value.PublishDate)
                                    ? <FormattedDate value={value.PublishDate} month="long" day="2-digit" />
                                    : null
                                }
                            </span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListVideo
