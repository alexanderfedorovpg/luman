import React from 'react'

import './style.scss'

function Rates() {

    return (
        <ul className="rates">
            <li className="rates__item">
                <span className="rates__name">Доллар</span>
                <span className="rates__value">57,01</span>
            </li>
            <li className="rates__item">
                <span className="rates__name">Евро</span>
                <span className="rates__value">62,12</span>
            </li>
            <li className="rates__item">
                <span className="rates__name">Шекель</span>
                <span className="rates__value">45,90</span>
            </li>
            <li className="rates__item">
                <span className="rates__name">Нефть</span>
                <span className="rates__value">51,17</span>
            </li>
        </ul>
    )
}

export default Rates
