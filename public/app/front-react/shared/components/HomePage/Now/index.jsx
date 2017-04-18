import React from 'react'
import classNames from 'classnames'

import MiniNews from 'components/MiniNews'

import './style.scss'

function Now({ className }) {

    return (
        <div className={classNames('now', className)}>
            <p className="now__title section-title">
                Сейчас
            </p>
            <div className="now__news">
                {data.map(value => (
                    <MiniNews data={value} key={value.title} className="now__mini-news" />
                ))}
            </div>
        </div>
    )
}

export default Now

const data = [
    {
        img: '/content/now/peskov.jpg',
        title: 'Овечкина и Малкина не пустили на Олимпиаду',
        when: 'Сегодня, 15:02',
        alt: ''
    },
    {
        img: '/content/now/peskov.jpg',
        title: 'В гибели Ту-154 обвинили диспетчеров',
        when: 'Вчера, 14:44',
        alt: ''
    },
    {
        img: '/content/now/peskov.jpg',
        title: 'МВФ одобрили выеделение $1 млрд для Украины',
        when: 'Сегодня, 15:02',
        alt: ''
    },
    {
        img: '/content/now/peskov.jpg',
        title: 'Новая газета рассказала о секретных тюрьмах для геев в Чечне',
        when: 'Сегодня, 15:02',
        alt: ''
    }
]
