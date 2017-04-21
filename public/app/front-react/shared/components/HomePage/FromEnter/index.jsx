import React from 'react'
import classNames from 'classnames'
import { FormattedTime, FormattedDate } from 'react-intl'

import { ensureAbs } from 'shared/utils/uri'

import './style.scss'

function FromEnter({ data, className }) {

    return (
        <div className={classNames('from-enter', className)}>
            <a className="from-enter__link from-enter__link from-enter__link_position" href="javascript:void(0)">
                <img className="from-enter__img" src={ensureAbs(data.ImagePreview)} alt="" alt="" role="presentation" />
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
            </a>
            <div className="from-enter__info">
                <a className="from-enter__link" href="javascript:void(0)">
                    {data.Title}
                </a>
                <p className="from-enter__category">
                    {`${data.category} `}
                    <span className="from-enter__time-add">
                        {Date.parse(data.PublishDate)
                            ? <FormattedDate value={data.PublishDate} month="long" day="2-digit" />
                            : null
                        }
                    </span>
                </p>
            </div>
        </div>
    )
}

export default FromEnter
