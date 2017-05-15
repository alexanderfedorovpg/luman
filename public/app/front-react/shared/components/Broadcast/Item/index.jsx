import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { FormattedTime, FormattedDate } from 'react-intl'

import { ensureAbs } from 'shared/utils/uri'

import './style.scss'

function FromEnter({ data, big, className }) {
    if (!data) return null

    const video = data.video_stream || {}

    return (
        <div className={classNames('from-enter', className, { 'from-enter_big': big })}>
            <Link to={`/broadcast/${data.id}`} className="from-enter__link from-enter__link from-enter__link_position">
                <img className="from-enter__img" src={ensureAbs(video.preview)} alt="" alt="" role="presentation" />
                <span className="from-enter__time-keeping">
                    <img className="from-enter__ico" src="/content/video-ico/video-ico.png" alt="" role="presentation" />
                    <span className="from-enter__keeping">
                        {`${video.duration}`.replace('.', ':')}
                    </span>
                </span>
            </Link>
            <div className="from-enter__info">
                <Link to={`/broadcast/${data.id}`} className="from-enter__link">
                    {data.title}
                </Link>
                <p className="from-enter__category">
                    {data.program
                        ? data.program.name
                        : null
                    }
                    {` `}
                    <span className="from-enter__time-add">
                        {Date.parse(data.publish_date)
                            ? <FormattedDate value={data.publish_date} month="long" day="2-digit" />
                            : null
                        }
                    </span>
                </p>
            </div>
        </div>
    )
}

export default FromEnter
