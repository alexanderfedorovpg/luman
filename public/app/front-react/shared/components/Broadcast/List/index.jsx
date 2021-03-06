import React from 'react'
import classNames from 'classnames'
import { FormattedDate } from 'react-intl'
import { Link } from 'react-router-dom'
import moment from 'moment';

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
                            {`${value.program ? value.program.name : ''} `}
                            <span className="list-video__time-add">
                                {
                                    !!value.publish_date &&
                                    <FormattedDate
                                        value={moment(value.publish_date).toDate()}
                                        month="long"
                                        day="2-digit"
                                    />
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
