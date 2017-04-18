import React from 'react'
import classNames from 'classnames'

import FromEnter from '../FromEnter'

import './style.scss'

function MoreVideo({ className }) {

    return (
        <div className={classNames('more-video more-video__no-border', className)}>
            <div className="more-video__title section-title">
                Из эфира
            </div>
            <div className="more-video__list">
                {data.map(value => (
                    <FromEnter className="more-video__from-enter" key={value.title} data={value} />
                ))}
            </div>
        </div>
    )
}

export default MoreVideo

const data = [
    {
        img: '/content/from-enter/from-enter.png',
        alt: '',
        title: 'Подробности атаки на Вестминстер: кем был лондонский террорист?',
        time_add: '2 часа назад',
        category: 'Новости',
        time_keeping: '03:40',
        time_keeping_img: '/content/video-ico/video-ico.png'
    },
    {
        img: '/content/from-enter/ny.png',
        alt: '',
        title: 'Почему бездомных в Нью-Йорке селят в отелях, и кто за это платит?',
        time_add: '2 часа назад',
        category: 'Тайм код',
        time_keeping: '03:40',
        time_keeping_img: '/content/video-ico/video-ico.png'
    },
    {
        img: '/content/from-enter/euro.png',
        alt: '',
        title: 'Конкурс политической песни: может ли Киев отказать во въезде Юлии Самойловой?',
        time_add: '2 часа назад',
        category: 'Русский акцент',
        time_keeping: '03:40',
        time_keeping_img: '/content/video-ico/video-ico.png'
    }
]
