import React from 'react'

import './style.scss'

function Rates() {

    return (
        <ul className="rates">
            <li className="rates__item">
                <span className="rates__name">Доллар</span>
                <span className="rates__value">60,00</span>
            </li>
            <li className="rates__item">
                <span className="rates__name">Евро</span>
                <span className="rates__value">66,80</span>
            </li>
            <li className="rates__item">
                <span className="rates__name">Шекель</span>
                <span className="rates__value">16,92</span>
            </li>
            <li className="rates__item">
                <span className="rates__name">Нефть</span>
                <span className="rates__value">44,55</span>
            </li>
        </ul>
    )
}

export default Rates
