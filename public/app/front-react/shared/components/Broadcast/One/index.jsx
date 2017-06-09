import React from 'react'
import classNames from 'classnames'

import FromEnter from 'components/Broadcast/Item'
import List from 'components/Broadcast/List'

import './style.scss'

function EnterOne({ data, className }) {
    const first = data[0]
    const rest = data.slice(0, 3)

    return (
        <div className={classNames('enter-one enter-one__no-border', className)}>
            <p className="from-enter__title section-title">
                Из эфира
            </p>
            <FromEnter data={first} />
            <List data={rest} />
        </div>
    )
}

export default EnterOne
