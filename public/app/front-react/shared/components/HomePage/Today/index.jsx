import React from 'react'
import classNames from 'classnames'

import Block from 'components/Block'

import './style.scss'

function Today({ data, className }) {
    const first = data[0]
    const rest = data.slice(1)

    return (
        <div className={classNames('per-day', className)}>
            <p className="per-day__title section-title">
                Главное за последние сутки
            </p>
            <Block data={first} rectangle />
            <div className="per-day__wrapper per-day__wrapper per-day__wrapper_margin">
                {rest.map(value => (
                    <Block data={value} key={value.id} />
                ))}
            </div>
        </div>
    )
}

export default Today
