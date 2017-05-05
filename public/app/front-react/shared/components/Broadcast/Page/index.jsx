import React from 'react'
import { FormattedRelative } from 'react-intl'

import Video from 'components/GeneralVideo'
import Tags from 'components/Tags'

import { ensureAbs } from 'shared/utils/uri'

import './style.scss'

function Detail({ data }) {

    return (
        <div className="inner-wrapper">
            <div className="inner-about inner-wrapper inner-default">
                <div className="inner-about__container container">
                    <div className="inner-about__left left-col left-col left-col_position_relative">
                        <h1>
                            {data.title}
                        </h1>
                        <div className="inner-about__date">
                            {Date.parse(data.publish_date)
                                ? <FormattedRelative value={data.publish_date} />
                                : null
                            }
                        </div>
                        <div className="text-bg-gray text-bg-gray--news inner-about__text-bg-gray">
                            <div className="text-bg-gray__block-text">
                                {data.theses
                                    ? data.theses.split('\\').map(v => (
                                        <div key={v} className="text-bg-gray__text text-bg-gray__text-lite">
                                            {v}
                                        </div>
                                    ))
                                    : null
                                }
                            </div>
                            <Video className="general-news__general-video" />
                            <div className="news-preview">
                                <Tags data={data.tags} />
                                <figure className="news-preview__img">
                                    <img src={ensureAbs(data.image_preview)} />
                                    <figcaption className="news-preview__source">
                                        {/*Фото: Mc_maxim / Twitter*/}
                                    </figcaption>
                                </figure>
                                <p className="news-preview__text">
                                    {data.sub_title}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="inner-about__right right-col">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
