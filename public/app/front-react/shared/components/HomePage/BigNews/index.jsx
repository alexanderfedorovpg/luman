import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
// import { FormattedRelative } from 'react-intl'
import FormatDate from 'components/FormatDate';

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
                        ? <FormatDate value={data.publish_date} />
                        : null
                    } /
                </p>
                <p className="big-news__time-update">
                    {'Обновлено '}
                    {Date.parse(data.updated_at)
                        ? <FormatDate value={data.updated_at}  />
                        : null
                    }
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
