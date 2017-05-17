import React from 'react'
import classNames from 'classnames'

import './style.scss'

function Subscribe({ className }) {

    return (
        <div className={classNames('subscribe-networks', className)}>
            <p className="subscribe-networks__title">Подпишитесь на нас
            </p>
            <div className="subscribe-networks__list-network">
                {subData.map(({ img, href }, i) => (
                    <a
                        key={i}
                        target="_blank"
                        className="subscribe-networks__ico-link"
                        href={href || '#'}
                    >
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
        href: 'https://www.facebook.com/myRTVi',
    },
    {
        title: 'twitter',
        img: '/content/subscribe-networks/twitter.png',
        href: 'https://twitter.com/RTVi',
    },
    {
        title: 'youtube',
        img: '/content/subscribe-networks/youtube.png',
        href: '',
    },
    {
        title: 'viber',
        img: '/content/subscribe-networks/viber.png',
        href: 'https://chats.viber.com/rtvi',
    },
    {
        title: 'ok',
        img: '/content/subscribe-networks/ok.png',
        href: 'https://ok.ru/rtvi',
    },
    {
        title: 'rss',
        img: '/content/subscribe-networks/rss.png',
        href: '',
    },
];
