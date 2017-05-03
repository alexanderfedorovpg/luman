import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { FormattedTime, FormattedDate } from 'react-intl'

import { ensureAbs } from 'shared/utils/uri'

import './style.scss'

function FromEnter({ data, className }) {

    return (
        <div className={classNames('from-enter', className)}>
            <Link to={`/broadcast/${data.id}`} className="from-enter__link from-enter__link from-enter__link_position">
                <img className="from-enter__img" src={ensureAbs(data.image_preview)} alt="" alt="" role="presentation" />
                <span className="from-enter__time-keeping">
                    <img className="from-enter__ico" src="/content/video-ico/video-ico.png" alt="" role="presentation" />
                    <span className="from-enter__keeping">
                    {Date.parse(data.time_keeping)
                        ? <FormattedTime value={data.time_keeping}
                            hour="2-digit"
                            minute="2-digit"
                            second="2-digit" />
                        : null
                    }
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
