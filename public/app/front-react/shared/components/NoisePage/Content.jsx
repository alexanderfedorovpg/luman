import React from 'react'
import { FormattedRelative } from 'react-intl'

import Socials from 'components/Socials'

import { ensureAbs } from 'shared/utils/uri'

function Content({ data, children }) {

    return (
        <div>
            <h1>{data.title}</h1>
            <div className="inner-about__date">
                {Date.parse(data.publish_date)
                    ? <FormattedRelative value={data.publish_date} />
                    : null
                }
            </div>
            <div className="text-bg-gray text-bg-gray--news inner-about__text-bg-gray">
                <div className="news-preview news-preview--wide">
                    <div className="breadcrumbs">
                    </div>
                    <figure className="news-preview__img">
                        <img src={ensureAbs(data.image_main)} />
                        <figcaption className="news-preview__source">
                            {/*Фото: Mc_maxim / Twitter*/}
                        </figcaption>
                    </figure>
                    <p className="news-preview__text">
                        {data.sub_title}
                    </p>
                </div>
                <Socials />
            </div>
            <div className="inner-about__content">
                {data.body}
                {children}
            </div>
        </div>
    )
}

export default Content
