import React from 'react'

function Alarm({ data }) {

    return (
        <span className="header__alarm-block">
            <span className="header__container container header__container header__container_alarm">
                <span className="header__when">
                    Сегодня
                </span>
                <span className="header__event">
                    {data}
                </span>
            </span>
        </span>
    )
}

export default Alarm
