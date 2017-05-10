import React from 'react'
import classNames from 'classnames'

import Block from 'components/Block'

import './style.scss'

function Today({ data, className, war }) {
    const first = data[0]
    const rest = data.slice(1, 3)

    return (
        <div className={classNames('per-day', className)}>
            {war
                ? null
                : (
                    <p className="per-day__title section-title">
                        Главное за последние сутки
                    </p>
                )
            }
            <Block data={first} war={war} rectangle />
            <div className="per-day__wrapper per-day__wrapper per-day__wrapper_margin">
                {rest.map(value => (
                    <Block data={value} key={value.id} war={war} warTitle={first.title} />
                ))}
            </div>
        </div>
    )
}

export default Today
