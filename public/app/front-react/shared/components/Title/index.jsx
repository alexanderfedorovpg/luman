import React from 'react'
import classNames from 'classnames'

import InlineSVG from 'components/InlineSVG'

import icon from './info.svg'
import './style.scss'

function Title({ children, className }) {

    return (
        <div className={classNames('title-block', className)}>
            <h1 className="title-block__title">
                {children}
                <InlineSVG src={icon} className="icon icon_info title-block__ico title-block__ico_info" />
            </h1>
        </div>
    )
}

export default Title
