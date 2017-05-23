import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { FormattedRelative } from 'react-intl'

import Img from 'components/Img'

import { newsLink } from 'shared/utils/uri'

import './style.scss'
import logo from './blue-rtvi.png'

function BigNews({ data, war, warTitle, className }) {

    const image = (data.image_preview||{}).url

    return (
        <div className={classNames('big-news', className)}>
            <Link className="big-news__link" to={newsLink(data)}></Link>
            <Img className="big-news__img" src={image} alt="" role="presentation" />
            <div className="big-news__info">
                <p className="big-news__title">
                    {war
                        ? `${warTitle}: ${data.title}`
                        : data.title
                    }
                </p>
                <p className="big-news__time-add">
                    {Date.parse(data.publish_date)
                        ? <FormattedRelative value={data.publish_date} units="minute" />
                        : null
                    } /
                </p>
                <p className="big-news__time-update">
                    {'Обновлено '}
                    {Date.parse(data.updated_at)
                        ? <FormattedRelative value={data.updated_at} units="minute" />
                        : null
                    }
                </p>
                <p className="big-news__description big-news__position big-news__position_margin">
                    {data.note}
                </p>
                <div className="big-news__logo">
                    <span className="big-news__logo-title">News</span>
                    <img className="big-news__logo" src={logo} alt="" role="presentation" />
                </div>
            </div>
        </div>
    )
}

export default BigNews
