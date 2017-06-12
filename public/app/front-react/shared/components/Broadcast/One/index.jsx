import React from 'react'
import classNames from 'classnames'

import FromEnter from 'components/Broadcast/Item'
import List from 'components/Broadcast/List'

import { Link } from 'react-router-dom'

import './style.scss'

function EnterOne({ data, className }) {
    const first = data[0]
    const rest = data.slice(0, 3)

    return (
        <div className={classNames('enter-one enter-one__no-border', className)}>
            <Link to="/broadcast" className="enter-one__title section-title">
                Из эфира
            </Link>
            <FromEnter data={first} />
            <List data={rest} />
        </div>
    )
}

export default EnterOne
