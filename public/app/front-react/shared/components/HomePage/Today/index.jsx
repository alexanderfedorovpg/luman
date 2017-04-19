import React from 'react'
import classNames from 'classnames'

import Block from 'components/Block'

import './style.scss'

function Today({ data, className }) {

    return (
        <div className={classNames('per-day', className)}>
            <p className="per-day__title section-title">
                Главное за последние сутки
            </p>
            <Block data={data[0]} rectangle />
            <div className="per-day__wrapper per-day__wrapper per-day__wrapper_margin">
                {data.slice(1).map(value => (
                    <Block data={value} key={value.Id} />
                ))}
            </div>
        </div>
    )
}

export default Today

const dataOne = {
    title: 'Плакат с накрашенным Путиным признали экстремистским',
    img: '/content/per-day/per-one.png',
    time_add: '5 часов назад',
    alt: '',
    time_update: 'Обновлено 15 минут назад',
    time_keeping: ''
}

const dataRest = [
    {
        title: 'Как следователи ФБР нашли доказательства вины России',
        img: '/content/per-day/per-two.png',
        time_add: 'час назад',
        alt: '',
        time_keeping: '03:40'
    },
    {
        title: 'Нацгвардию Украины боятся взрослые российские мужчины',
        img: '/content/per-day/per-three.png',
        time_add: 'час назад',
        alt: '',
        time_keeping: '03:40'
    },
]
