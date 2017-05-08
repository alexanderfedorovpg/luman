import React from 'react'
import { Link } from 'react-router-dom'

import { ensureAbs, newsLink } from 'shared/utils/uri'

import './style.scss'

function BlockMini({ data }) {
    if (!data) return null

    return (
        <div className="block-rectangle-mini">
            <img src={ensureAbs(data.image_preview)} className="block-rectangle-mini__img" />
            <Link to={newsLink(data)} className="block-rectangle-mini__link">
                <i className="block-rectangle-mini__points" />
                <p className="block-rectangle-mini__title">
                    {data.title}
                </p>
            </Link>
        </div>
    )
}

export default BlockMini
