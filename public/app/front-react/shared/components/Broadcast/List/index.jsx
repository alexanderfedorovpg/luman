import React from 'react'
import classNames from 'classnames'
import { FormattedDate } from 'react-intl'
import { Link } from 'react-router-dom'

import './style.scss'

function ListVideo({ data, className }) {

    return (
        <div className={classNames('list-video', className)}>
            {data.map(value => (
                <div key={value.id} className="list-video__item">
                    <img className="list-video__ico-play" src="/content/video-ico/video-ico-blue.png" alt="" role="presentation" />
                    <div className="list-video__info">
                        <Link className="list-video__title" to={`/broadcast/${value.id}`}>
                            {value.title}
                        </Link>
                        <p className="list-video__category">
                            {`${value.program.name} `}
                            <span className="list-video__time-add">
                                {Date.parse(value.publish_date)
                                    ? <FormattedDate value={value.publish_date} month="long" day="2-digit" />
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
