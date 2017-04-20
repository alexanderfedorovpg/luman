import React from 'react'
import classNames from 'classnames'
import dateFormat from 'dateformat'
import { FormattedRelative } from 'react-intl'

import { ensureAbs } from 'shared/utils/uri'

import './style.scss'

function MiniNews({ data, className }) {

    return (
        <div className={classNames('mini-news', className)}>
            <img className="mini-news__img" src={ensureAbs(data.ImagePreview)} alt="" role="presentation" />
            <div className="mini-news__info">
                <a className="mini-news__title" href="javascript:void(0)">
                    {data.Title}
                </a>
                {Date.parse(data.PublishDate)
                    ? (
                        <p className="mini-news__date">
                            <FormattedRelative value={data.PublishDate} units="day" />
                            , {dateFormat(data.PublishDate, 'HH:MM')}
                        </p>
                    )
                    : null
                }
            </div>
        </div>
    )
}

export default MiniNews
