import React from 'react'
import classNames from 'classnames'

import './style.scss'

function Subscribe({ className }) {

    return (
        <div className={classNames('subscribe-networks', className)}>
            <p className="subscribe-networks__title">Подпишитесь на нас
            </p>
            <div className="subscribe-networks__list-network">
                {subData.map(({ title, href }, i) => (
                    <a
                        key={i}
                        target="_blank"
                        className="subscribe-networks__ico-link"
                        href={href || '#'}
                    >
                       <span className={'subscribe-networks__ico-image subscribe-networks__ico-image_' + title}></span>
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
        href: 'https://www.facebook.com/myRTVi/',
    },
    {
        title: 'twitter',
        href: 'https://twitter.com/RTVi',
    },
    {
        title: 'instagram',
        href: 'https://instagram.com/rtvichannel/',
    },
    {
        title: 'vk',
        href: 'https://vk.com/rtvi',
    },
    {
        title: 'ok',
        href: 'http://ok.ru/rtvi',
    },
    {
        title: 'telegram',
        href: 'https://t.me/rtvireal',
    },
    {
        title: 'viber',
        href: 'http://viber.com/rtvi',
    },
];
