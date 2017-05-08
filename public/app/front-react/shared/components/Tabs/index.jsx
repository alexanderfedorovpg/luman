import React from 'react'
import classNames from 'classnames'

import './style.scss'

function Tabs({ data, active, onChange }) {

    return (
        <div className="breadcrumb">
            <ul className="breadcrumb__ul">
                {data.map(v => (
                    <li
                        key={v.id}
                        className={classNames('breadcrumb__item', {
                            'breadcrumb__item_active': v.id == active
                        })}>
                        <a
                            className="breadcrumb__link"
                            onClick={() => onChange(v.id)}>
                            {v.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Tabs
