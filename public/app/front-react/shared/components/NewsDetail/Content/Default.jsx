import React from 'react'
import { FormattedRelative } from 'react-intl'

import Socials from 'components/Socials'
import Rubrics from 'components/Rubrics'
import Img from 'components/Img'

function Content({ data, children }) {

    const image = data.image_main||{}

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
                    <Rubrics data={data.rubrics} />
                    <figure className="news-preview__img">
                        <Img
                            src={image.url}
                            title={image.object_name||''}
                            alt={image.object_name||''} />
                        {image.object_author && image.object_source
                            && (
                                <figcaption className="news-preview__source">
                                    Фото: {image.object_author} / {image.object_source}
                                </figcaption>
                            )
                        }
                    </figure>
                    <p className="news-preview__text">
                        {data.sub_title}
                    </p>
                </div>
                <Socials />
            </div>
            <div className="inner-about__content">
                <div dangerouslySetInnerHTML={{ __html: data.body }} />
                {children}
            </div>
        </div>
    )
}

export default Content
