import React from 'react'
import classNames from 'classnames'

import MiniNews from 'components/MiniNews'

import './style.scss'

function Noise({ className }) {

    return (
        <div className={classNames('info-noize', className)}>
            <p className="info-noize__title section-title">
                Инфошум
            </p>
            <div className="info-noize__wrapper">
                {data.map(value => (
                    <MiniNews data={value} key={value.title} className="info-noize__mini-news" />
                ))}
            </div>
        </div>
    )
}

export default Noise

const data = [
    {
        title: 'Палестинец на машине врезался в группу израильских солдат',
        when: '10 часов назад'
    },
    {
        title: 'Марин Ле Пен пообещала бороться за отмену санкций против россиян',
        when: 'Вчера, 14:44'
    },
    {
        title: 'Зюганов назвал Навального трезвым Ельциным',
        when: 'Вчера, 09:18'
    },
    {
        title: 'У Лондонского террориста оказалось другое имя',
        when: '6 апреля, 07:12'
    },
    {
        title: 'Медведев: Навальный подставляет молодых людей для достижения шкурных целей',
        when: '5 апреля, 16:10'
    }
]
