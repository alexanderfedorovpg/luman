import React from 'react'

import './style.scss'

function Tags({ data }) {
    if (!data) return null

    const cleanData = data.filter(v => v && `${v}`.trim())

    return (
        <div className="breadcrumbs">
            {cleanData.map(v => (
                <a key={v} className="breadcrumbs__item">
                    {v}
                </a>
            ))}
        </div>
    )
}

export default Tags
