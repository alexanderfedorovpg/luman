import React from 'react'
import { FormattedRelative } from 'react-intl'

import Video from 'components/GeneralVideo'
import Tags from 'components/Tags'

import { ensureAbs } from 'shared/utils/uri'

function Content({ data, children }) {
    const theses = Array.isArray(data.theses)
        ? data.theses
        : `${data.theses}`.split('\\')

    return (
        <div>
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
                {theses.length
                    ? (
                        <div className="text-bg-gray__block-text">
                            {theses.map(v => (
                                <div key={v} className="text-bg-gray__text text-bg-gray__text-lite">
                                    {v}
                                </div>
                            ))}
                        </div>
                    )
                    : null
                }
                {/*<div className="general-video general-news__general-video">
                    <Video />
                </div>*/}
                <Video className="general-news__general-video general-video_left" />
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
            <div className="inner-about__content">
                {data.body}
                {children}
            </div>
        </div>
    )
}

export default Content
