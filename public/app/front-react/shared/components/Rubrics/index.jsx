import React from 'react'

import './style.scss'

function Rubrics({ data }) {
    if (!data) return null

    const cleanData = data.filter(v => v && `${v}`.trim())

    return (
        <div className="breadcrumbs">
            {cleanData.map(v => (
                <a key={v.id} className="breadcrumbs__item">
                    {v.name}
                </a>
            ))}
        </div>
    )
}

export default Rubrics
