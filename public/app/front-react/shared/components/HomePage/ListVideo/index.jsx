import React from 'react'
import classNames from 'classnames'

import './style.scss'

function ListVideo({ className }) {

    return (
        <div className={classNames('list-video', className)}>
            {data.map(value => (
                <div key={value.title} className="list-video__item">
                    <img className="list-video__ico-play" src={value.img} alt="" role="presentation" />
                    <div className="list-video__info">
                        <a className="list-video__title" href="javascript:void(0)">
                            {value.title}
                        </a>
                        <p className="list-video__category">
                            {`${value.category} `}
                            <span className="list-video__time-add">
                                {value.time_add}
                            </span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListVideo

const data = [
    {
        img: '/content/video-ico/video-ico-blue.png',
        title: 'Овечкина и Малкина не пустили на Олимпиаду',
        category: 'Тайм код',
        time_add: '25 марта'
    },
    {
        img: '/content/video-ico/video-ico-blue.png',
        title: 'В гибели Ту-154 обвинили диспетчеров',
        category: 'Название передачи',
        time_add: '20 марта'
    },
    {
        img: '/content/video-ico/video-ico-blue.png',
        title: 'МВФ одобрил выделение $1 млрд для Украины',
        category: 'Название',
        time_add: '20 марта'
    }
]
