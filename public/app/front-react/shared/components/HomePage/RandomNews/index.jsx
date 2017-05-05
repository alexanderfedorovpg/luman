import React from 'react'
import classNames from 'classnames'

import Block from 'components/Block'

import './style.scss'

function RandomNews({ data, className }) {
    const primal = data[0]
    const secondary = data.slice(1, 4)
    const rest = data.slice(4)

    if (rest.length) {
        secondary.push({ list: rest })
    }

    return (
        <div className={classNames("random-news", className)}>
            <div className="random-news__row">
                <Block data={primal} rectangle className="random-news__block-rectangle random-news__block" />
                {secondary.map((value, i) => (
                    <Block data={value} key={i} className="random-news__block-square random-news__block random-news__block-square_list" />
                ))}
            </div>
        </div>
    )
}

export default RandomNews
