import React from 'react'
import classNames from 'classnames'
import dateFormat from 'dateformat'
import { FormattedRelative } from 'react-intl'

import { ensureAbs } from 'shared/utils/uri'

import './style.scss'

function MiniNews({ data, className }) {

    return (
        <div className={classNames('mini-news', className)}>
            <img className="mini-news__img" src={ensureAbs(data.image_preview)} alt="" role="presentation" />
            <div className="mini-news__info">
                <a className="mini-news__title" href="javascript:void(0)">
                    {data.title}
                </a>
                {Date.parse(data.publish_date)
                    ? (
                        <p className="mini-news__date">
                            <FormattedRelative value={data.publish_date} units="day" />
                            , {dateFormat(data.publish_date, 'HH:MM')}
                        </p>
                    )
                    : null
                }
            </div>
        </div>
    )
}

export default MiniNews
