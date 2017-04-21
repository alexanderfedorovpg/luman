import React from 'react'
import classNames from 'classnames'
import { FormattedRelative } from 'react-intl'

import { ensureAbs } from 'shared/utils/uri'
import MiniNews from 'components/MiniNews'

import './style.scss'

function Item({ data, className, rectangle }) {
    const type = rectangle
        ? 'block-rectangle'
        : 'block-square';
if (!data) return null;
    return (
        data.list
            ? renderList(className, type, data.list)
            : renderItem(className, type, data)
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

function renderItem(className, type, data) {

    return (
        <div className={classNames(`${type}`, className)}>
            <a className={`${type}__link`} href="javascript:void(0)"></a>
            <img className={`${type}__img`} src={ensureAbs(data.ImagePreview)} alt=" "role="presentation" />
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
                    {data.Title}
                </p>
                <p className={`${type}__time-add`}>
                    {Date.parse(data.PublishDate)
                        ? <FormattedRelative value={data.PublishDate} />
                        : null
                    }
                    {data.time_update
                        ? (
                            <span className={`${type}__time-upadate`}>
                                {data.time_update}
                            </span>
                        )
                        : null
                    }
                </p>
            </div>
        </div>
    )
}

export default Item
