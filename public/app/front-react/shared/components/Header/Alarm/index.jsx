import React from 'react'

function Alarm({ data }) {

    return (
        <a className="header__alarm-block" href="javascript:void(0)">
            <span className="header__container container header__container header__container_alarm">
                <span className="header__when">
                    Сегодня
                </span>
                <span className="header__event">
                    Руководитель Северной Кореи убит в результате спецоперации
                </span>
                <span className="header__event-link">Всё об этом</span>
            </span>
        </a>
    )
}

export default Alarm
