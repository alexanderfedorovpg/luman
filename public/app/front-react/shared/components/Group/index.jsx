import React from 'react'
import classNames from 'classnames'

import './style.scss'

function Group({ className, title, margin, children }) {

    return (
        <div className={classNames('group', className, { 'group_margin': margin })}>
            <p className="group__title section-title">
                {title}
            </p>
            <div className="group__wrapper">
                {children}
            </div>
        </div>
    )
}

export default Group
