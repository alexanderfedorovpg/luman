import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { FormattedRelative } from 'react-intl'

import { ensureAbs, newsLink } from 'shared/utils/uri'
import MiniNews from 'components/MiniNews'

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
        <div className={classNames(`${type} ${type}_list`, className, { [`${type}_war`]: war })}>
            {data.map((value, i) => (
                <MiniNews key={i} data={value} />
            ))}
        </div>
    )
}

function renderItem(className, type, data, war, wTitle) {
    return (
        <div className={classNames(`${type}`, className, { [`${type}_war`]: war })}>
            <Link className={`${type}__link`} to={newsLink(data)}></Link>
            <img className={`${type}__img`} src={ensureAbs(data.image_preview)} alt=" "role="presentation" />
            <div className={`${type}__info`}>
                {data.time_keeping
                    ? (
                        <div className={`${type}__time-keeping`}>
                            <img className={`${type}__ico`} src="/content/video-ico/video-ico.png" alt="" role="presentation" />
                            <span className={`${type}__keeping`}>{data.time_keeping}</span>
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
                            {Date.parse(data.publish_date)
                                ? <FormattedRelative value={data.publish_date} />
                                : null
                            }
                            {Date.parse(data.updated_at)
                                ? (
                                    <span className={`${type}__time-upadate`}>
                                        / Обновлено <FormattedRelative value={data.updated_at} />
                                    </span>
                                )
                                : null
                            }
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default Item
