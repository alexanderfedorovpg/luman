import React from 'react'
import classNames from 'classnames'

import Block from 'components/Block'

import './style.scss'

function RandomNews({ data, className }) {
    const primal = data[0]
    const secondary = data.slice(1, 4)
    const rest = data.slice(4)

    return (
        <div className={classNames("random-news", className)}>
            <div className="random-news__row">
                <Block data={primal} rectangle className="random-news__block-rectangle random-news__block" />
                {[...secondary, { list: rest }].map((value, i) => (
                    <Block data={value} key={i} className="random-news__block-square random-news__block" />
                ))}
            </div>
        </div>
    )
}

export default RandomNews

const dataOne = {
    title: 'Более 250 погибших в результате катаклизма в Колумбии',
    title_size: 'block-rectangle__title_font_small',
    img: '/content/random-news/queen.png',
    time_add: '5 часов назад',
    alt: '',
    time_update: 'Обновлено 15 минут назад',
    time_keeping: '03:40'
}

const dataRest = [
    {
        title: 'Президент РФ подписал закон о дебоширах на общественном транспорте‍',
        title_size: 'block-square__title_font_small',
        img: '/content/random-news/random.png',
        time_add: '3 часа назад',
        alt: '',
        //time_update: 'Обновлено 15 минут назад',
       // time_keeping: '03:40'
    },
    {
        title: 'Спецслужбы США ищут российского шпиона, помогавшего Трампу',
        title_size: 'block-square__title_font_small',
        img: '/content/random-news/usa.png',
        time_add: '3 часа назад',
        alt: '',
        //time_update: 'Обновлено 15 минут назад',
        // time_keeping: '03:40'
    },
    {
        title: 'Закон о праве отказа от налогового резидентства РФ подписан Путиным',
        title_size: 'block-square__title_font_small',
        img: '/content/random-news/putin.png',
        time_add: '3 часа назад',
        alt: '',
        //time_update: 'Обновлено 15 минут назад',
        // time_keeping: '03:40'
    },
    {
        list: [
            {
                img: '/content/now/peskov.jpg',
                title: 'Центробанк России впервые с 2014 года установил ключевую ставку ниже 10%',
                when: 'Сегодня, 15:02',
                alt: ''
            },
            {
                img: '/content/now/peskov.jpg',
                title: 'Марин Ле Пен пообещала бороться за отмену санкций против россиян',
                when: 'Вчера, 14:44',
                alt: ''
            },
            {
                img: '/content/now/peskov.jpg',
                title: 'Зюганов назвал Навального трезвым Ельциным',
                when: 'Сегодня, 15:02',
                alt: ''
            }
        ]
    }
]
