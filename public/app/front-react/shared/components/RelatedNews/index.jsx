import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedDate, FormattedTime } from 'react-intl'

import Block from 'components/Block'
import FormatDate from 'components/FormatDate';

import { newsLink } from 'shared/utils/uri'

import './style.scss'
import 'components/HomePage/RandomNews/style.scss'
import 'components/Block/style.scss'
import 'components/MiniNews/style.scss'

function RelatedNews({ data, title }) {
    const first = data[0]
    const rest = data.slice(1, 3)

    return (
        first
        ? (
            <div className="similar-news similar-news--wide">
                <p className="similar-news__title section-title">
                    {title || 'Новости по теме'}
                </p>
                <div className="similar-news__row">
                    <div className="similar-news__col-l">
                        <Block className="random-news__block-square" data={first} />
                    </div>
                    <div className="similar-news__col-r">
                        <div className="block-square random-news__block-square random-news__block-square random-news__block-square_list random-news__block">
                            {rest.map(v => (
                                <div key={v.id} className="mini-news">
                                    <div className="mini-news__info">
                                        <Link to={newsLink(v)} className="mini-news__title">
                                            {v.title}
                                        </Link>
                                        <p className="mini-news__date">
                                            {
                                                !!v.publish_date &&
                                                <FormatDate
                                                    created={v.publish_date}
                                                    updated={v.updated_at}
                                                />
                                            }
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
        : null
    )
}

export default RelatedNews
