import React from 'react'
import styled from 'styled-components'

import Item from './Item'

const Root = styled.div`
    width: 100%;
    margin-top: -15px;
`

function Content() {

    return (
        <Root>
            {items.map((value, i) => {
                return (
                    <Item key={i} data={value} />
                )
            })}
        </Root>
    )
}

export default Content


const items = [

    {
        rating: '6',
        ratingClass: 'rating-6',
        tag: 'Политика',
        cnt: 'Петагон: США готовы сбить ракеты КНДР при наличии угрозы',
        cntClass: 'working__cnt--newest',
        userName: 'Ковалев Максим',
        userPic: '/img/user.png',
        time: '15 мин',
        statusClass: 'is-active'
    },

    {
        rating: '8',
        ratingClass: 'rating-8',
        tag: 'Политика',
        cnt: 'Южная Корея и США формируют отряд спецназа для убийства Ким Чен Ына',
        cntClass: 'working__cnt--new',
        userName: 'Константинов Виталий',
        userPic: '/img/user1.png',
        time: '3 мин',
        statusClass: 'is-active'
    },

    {
        rating: '2',
        ratingClass: 'rating-2',
        tag: 'Общество',
        cnt: 'Гвардеец едва не застрелил королеву Великобритании Елизавету II',
        userName: 'Марышева Елена',
        userPic: '/img/user2.png',
        time: '54 мин'
    },

    {
        rating: '7',
        ratingClass: 'rating-7',
        tag: 'Наука',
        cnt: 'Российские ученые нашли противоречия в самом популярном методе теоретической химии',
        userName: 'Короленко Анастасия',
        userPic: '/img/user3.png',
        time: '1 ч 15 мин',
        timeClass: 'is-out',
        statusClass: 'is-active'
    },

    {
        rating: '6',
        ratingClass: 'rating-6',
        tag: 'Спорт',
        cnt: 'НХЛ рассматривает возможность проводить матчи в Китае',
        userName: 'Поликарпов Анатолий',
        userPic: '/img/user4.png',
        time: '4 ч 8 мин',
        timeClass: 'is-out',
        statusClass: 'is-active'
    },

    {
        rating: '5',
        ratingClass: 'rating-5',
        tag: 'Политика',
        cnt: 'Помощник Трампа не исключил «принятия мер» против РФ из-за «кибератак»',
        userName: 'Санченков Роман',
        userPic: '/img/user5.png',
        time: '54 мин'
    }

]
