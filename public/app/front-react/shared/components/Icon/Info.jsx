import React from 'react'
import classNames from 'classnames'

import info from './info.png'

function InfoIcon({ className, width, height }) {

    return (
        <img className={classNames('icon icon_info', className)} src={info} alt=""/>
    )
}

export default InfoIcon
