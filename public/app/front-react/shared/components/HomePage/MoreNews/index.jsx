import React from 'react'
import classNames from 'classnames'

import MiniNews from 'components/MiniNews'

import './style.scss'

function MoreNews({ data, className }) {

    return (
        <div className={classNames("more-news", className)}>
            {data.map(value => (
                <MiniNews key={value.Id} data={value} />
            ))}
        </div>
    )
}

export default MoreNews
