import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import dateFormat from 'dateformat'
import { FormattedRelative } from 'react-intl'

import Img from 'components/Img'

import { newsLink } from 'shared/utils/uri'

import './style.scss'

function MiniNews({ data, className }) {

    const image = (data.image_preview||{}).url

    return (
        <div className={classNames('mini-news', className)}>
            <Img className="mini-news__img" src={image} alt="" role="presentation" />
            <div className="mini-news__info">
                <Link
                    className="mini-news__title"
                    to={newsLink(data)}
                    dangerouslySetInnerHTML={{ __html: data.title }} />

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
