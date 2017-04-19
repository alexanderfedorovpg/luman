import React from 'react'
import classNames from 'classnames'

import './style.scss'

function Subscribe({ className }) {

    return (
        <div className={classNames('subscribe-networks', className)}>
            <p className="subscribe-networks__title">Подпишитесь на нас
            </p>
            <div className="subscribe-networks__list-network">
                {subData.map(({ img }, i) => (
                    <a key={i} className="subscribe-networks__ico-link" href="javascript:void(0)">
                        <img className="subscribe-networks__ico-image" src={img} alt="" role="presentation" />
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Subscribe

const subData = [
    {
        title: 'facebook',
        img: '/content/subscribe-networks/facebook.png',
    },
    {
        title: 'twitter',
        img: '/content/subscribe-networks/twitter.png',
    },
    {
        title: 'youtube',
        img: '/content/subscribe-networks/youtube.png',
    },
    {
        title: 'viber',
        img: '/content/subscribe-networks/viber.png',
    },
    {
        title: 'ok',
        img: '/content/subscribe-networks/ok.png',
    },
    {
        title: 'rss',
        img: '/content/subscribe-networks/rss.png',
    }
]
