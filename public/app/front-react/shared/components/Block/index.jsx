import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
// import { FormattedRelative } from 'react-intl'

import FormatDate from 'components/FormatDate';

import { newsLink } from 'shared/utils/uri'
import MiniNews from 'components/MiniNews'
import Img from 'components/Img'

import './style.scss'

function Item({ data, className, rectangle, war, warTitle }) {
    const type = rectangle
        ? 'block-rectangle'
        : 'block-square';

    if (!data) return null;

    return (
        data.list
            ? renderList(className, type, data.list)
            : renderItem(className, type, data, war, warTitle)
    )
}

function renderList(className, type, data) {

    return (
        <div className={classNames(`${type} ${type}_list`, className)}>
            {data.map((value, i) => (
                <MiniNews key={i} data={value} />
            ))}
        </div>
    )
}

function renderItem(className, type, data, war, wTitle) {
    const video = data.video_stream

    const image = (data.image_preview||{}).url

    return (
        <div className={classNames(`${type}`, className, { [`${type}_war`]: war })}>
            <Link className={`${type}__link`} to={newsLink(data)}></Link>
            <Img className={`${type}__img`} src={image} alt=" "role="presentation" />
            <div className={`${type}__info`}>
                {video
                    ? (
                        <div className={`${type}__time-keeping`}>
                            <img className={`${type}__ico`} src="/content/video-ico/video-ico-big.svg" alt="" role="presentation" />
                            <span className={`${type}__keeping`}>{video.duration}</span>
                        </div>
                    )
                    : null
                }
                <p className={`${type}__title`}>
                    {data.title}
                </p>
                {war
                    ? (
                        <p className={`${type}__title-war`}>
                            {wTitle}
                        </p>
                    )
                    : (
                        <p className={`${type}__time-add`}>
                            <FormatDate
                                created={data.publish_date}
                                updated={data.updated_at}
                            />
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default Item
