import React from 'react'
import classNames from 'classnames'

import FromEnter from '../FromEnter'

import './style.scss'

function EnterOne({ data, className }) {

    return (
        <div className={classNames('enter-one enter-one__no-border', className)}>
            <p className="enter-one__title section-title">
                Из эфира
            </p>
            <FromEnter data={data} />
        </div>
    )
}

export default EnterOne
