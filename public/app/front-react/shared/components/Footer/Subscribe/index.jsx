import React from 'react'
import classNames from 'classnames'

import './style.scss'

function Subscribe({ className }) {

    return (
        <div className={classNames('subscribe-networks', className)}>
            <p className="subscribe-networks__title">Подпишитесь на нас
            </p>
            <div className="subscribe-networks__list-network">
                {subData.map(({ img, img_hover, href }, i) => (
                    <a
                        key={i}
                        target="_blank"
                        className="subscribe-networks__ico-link"
                        href={href || '#'}
                    >
                        <img className="subscribe-networks__ico-image" src={img} data-hover={img_hover} alt="" role="presentation" />
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
        img_hover: '/content/subscribe-networks/facebook-hover.png',
        href: 'https://www.facebook.com/myRTVi/',
    },
    {
        title: 'twitter',
        img: '/content/subscribe-networks/twitter.png',
        img_hover: '/content/subscribe-networks/twitter-hover.png',
        href: 'https://twitter.com/RTVi',
    },
    {
        title: 'instagram',
        img: '/content/subscribe-networks/instagram.png',
        img_hover: '/content/subscribe-networks/instagram-hover.png',
        href: 'https://instagram.com/rtvichannel/',
    },
    {
        title: 'vk',
        img: '/content/subscribe-networks/vk.png',
        img_hover: '/content/subscribe-networks/vk-hover.png',
        href: 'https://vk.com/rtvi',
    },
    {
        title: 'ok',
        img: '/content/subscribe-networks/ok.png',
        img_hover: '/content/subscribe-networks/ok-hover.png',
        href: 'http://ok.ru/rtvi',
    },
    {
        title: 'telegram',
        img: '/content/subscribe-networks/telegram.png',
        img_hover: '/content/subscribe-networks/telegram-hover.png',
        href: 'https://t.me/rtvireal',
    },
    {
        title: 'viber',
        img: '/content/subscribe-networks/viber.png',
        img_hover: '/content/subscribe-networks/viber-hover.png',
        href: 'http://viber.com/rtvi',
    },
];
