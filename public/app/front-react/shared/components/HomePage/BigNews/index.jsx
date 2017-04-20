import React from 'react'
import classNames from 'classnames'
import { FormattedRelative } from 'react-intl'

import { ensureAbs } from 'shared/utils/uri'

import './style.scss'
import logo from './blue-rtvi.png'

function BigNews({ data, className }) {

    return (
        <div className={classNames('big-news', className)}>
            <a className="big-news__link" href="javascript:void(0)"></a>
            <img className="big-news__img" src={ensureAbs(data.ImagePreview)} alt="" role="presentation" />
            <div className="big-news__info">
                <p className="big-news__title">
                    {data.Title}
                </p>
                <p className="big-news__time-add">
                    {Date.parse(data.PublishDate)
                        ? <FormattedRelative value={data.PublishDate} units="minute" />
                        : null
                    } /
                </p>
                <p className="big-news__time-update">
                    {'Обновлено '}
                    {Date.parse(data.UpdateDate)
                        ? <FormattedRelative value={data.UpdateDate} units="minute" />
                        : null
                    }
                </p>
                <p className="big-news__description big-news__position big-news__position_margin">
                    {data.Note}
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
