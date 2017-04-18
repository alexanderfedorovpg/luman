import React from 'react'
import classNames from 'classnames'

import './style.scss'

function MiniNews({ data, className }) {

    return (
        <div key={data.title} className={classNames('mini-news', className)}>
            <img className="mini-news__img" src={data.img} alt="" role="presentation" />
            <div className="mini-news__info">
                <a className="mini-news__title" href="javascript:void(0)">
                    {data.title}
                </a>
                <p className="mini-news__date">
                    {data.when}
                </p>
            </div>
        </div>
    )
}

export default MiniNews
