import React from 'react'
import classNames from 'classnames'

import IconInfo from 'components/Icon/Info'

import './style.scss'

function Title({ children, className }) {

    return (
        <div className={classNames('title-block', className)}>
            <h1 className="title-block__title">
                {children}
                <IconInfo className="title-block__ico title-block__ico_info" />
            </h1>
        </div>
    )
}

export default Title
