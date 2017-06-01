import React from 'react'

import './style.css'

function Rubrics({ data }) {
    if (!data) return null

    const cleanData = data.filter(v => v && `${v}`.trim())

    return (
        <div className="breadcrumbs">
            {cleanData.map((v,i) => (
                <a key={i} className="breadcrumbs__item">
                    {v.name}
                </a>
            ))}
        </div>
    )
}

export default Rubrics
