import React from 'react'
import classNames from 'classnames'

import MiniNews from 'components/MiniNews'

import './style.scss'

function MoreNews({ className }) {

    return (
        <div className={classNames("more-news", className)}>
            {data.map(value => (
                <MiniNews key={value.title} data={value} />
            ))}
        </div>
    )
}

export default MoreNews

const data = [
    {
        title: 'Ройзман придет как свидетель защиты на процесс блогера Соколовского',
        when: '10 часов назад'
    },
    {
        title: 'Силовики нарушили перемирие почти 80 раз за два дня, заявили в ДНР',
        when: 'Вчера, 14:44'
    },
    {
        title: 'Путин: действующих ограничений в интернете пока достаточно',
        when: 'Вчера, 09:18'
    },
    {
        title: 'РПЦ раскритиковала законопроект, который разрешает носить хиджабы в школах Чечни',
        when: '6 апреля, 07:12'
    },
    {
        title: 'ФБР создаст отдел для расследования вмешательства России в выборы',
        when: '5 апреля, 16:10'
    }
]
