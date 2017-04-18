import React from 'react'
import classNames from 'classnames'

import FromEnter from '../FromEnter'

import './style.scss'

function EnterOne({ className }) {

    return (
        <div className={classNames('enter-one enter-one__no-border', className)}>
            <p className="enter-one__title section-title">
                Из эфира
            </p>
            <FromEnter data={data} />
        </div>
    )
}

export default EnterOne

const data = {
    img: '/content/from-enter/from-enter.png',
    alt: '',
    title: 'Подробности атаки на Вестминстер: кем был лондонский террорист?',
    time_add: '2 часа назад',
    category: 'Новости',
    time_keeping: '03:40',
    time_keeping_img: '/content/video-ico/video-ico.png'
}
