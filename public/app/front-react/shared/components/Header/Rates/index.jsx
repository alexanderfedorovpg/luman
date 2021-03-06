import React from 'react'

import './style.scss'

function Rates() {

    return (
        <ul className="rates">
            <li className="rates__item">
                <span className="rates__name">Доллар</span>
                <span className="rates__value">59,66</span>
            </li>
            <li className="rates__item">
                <span className="rates__name">Евро</span>
                <span className="rates__value">66,68</span>
            </li>
            <li className="rates__item">
                <span className="rates__name">Шекель</span>
                <span className="rates__value">16,85</span>
            </li>
            <li className="rates__item">
                <span className="rates__name">Нефть</span>
                <span className="rates__value">45,63</span>
            </li>
        </ul>
    )
}

export default Rates
