import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
// import dateFormat from 'dateformat'
// import { FormattedRelative } from 'react-intl'

import FormatDate from 'components/FormatDate';

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
                <p className="mini-news__date">
                    <FormatDate value={data.created_at} />
                </p>
            </div>
        </div>
    )
}

export default MiniNews
