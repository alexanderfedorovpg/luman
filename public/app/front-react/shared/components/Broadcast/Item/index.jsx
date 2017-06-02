import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { FormattedTime, FormattedDate } from 'react-intl'

import Img from 'components/Img'

import './style.scss'

function FromEnter({ data, big, className }) {
    if (!data) return null

    const video = data.video_stream || {}

    return (
        <div className={classNames(`block-square`, className)}>
            <Link className="block-square__link" to={`/broadcast/${data.id}`}></Link>
            <Img className="block-square__img" src={video.preview} alt=" "role="presentation" />
            <div className="block-square__info">
                {video
                    ? (
                        <div className="block-square__time-keeping">
                            <img className="block-square__ico" src="/content/video-ico/video-ico.png" alt="" role="presentation" />
                            <span className="block-square__keeping">{video.duration}</span>
                        </div>
                    )
                    : null
                }
                <p className="block-square__title">
                    {data.title}
                </p>
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
