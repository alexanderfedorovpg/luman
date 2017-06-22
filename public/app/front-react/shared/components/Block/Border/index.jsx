import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
// import { FormattedRelative } from 'react-intl'
import FormatDate from 'components/FormatDate';

import './style.scss'

import { newsLink } from 'shared/utils/uri'

function BlockBorder({ data, className }) {
    if (!data) return null

    return (
        <div className={classNames('block-rectangle-border', className)}>
            <Link to={newsLink(data)} className="block-rectangle-border__link">
                <p className="block-rectangle-border__title">
                    {data.title}
                </p>
                <div className="block-rectangle-border__date">
                    <FormatDate value={data.created_at} />
                </div>
            </Link>
        </div>
    )
}

export default BlockBorder
