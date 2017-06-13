import React from 'react'
import {FormattedRelative, FormattedDate, FormattedTime} from 'react-intl';

import './style.scss';

const twoDays = 172800000;

function FormatDate({value}) {
    const parsed = Date.parse(value);
    const date = new Date(parsed);
    const now = new Date();

    function getDate () {
        if (now.getTime() - date.getTime() >= 172800000) {
            // return (
            //     <span>{date.toLocaleDateString()} {date.getHours()}:{date.getMinutes()}</span>
            // )
            return (
                <span className='format-date'>
                    <FormattedDate value={parsed} year='numeric' month='2-digit' day='2-digit' />
                    <FormattedTime value={parsed} hour='numeric' minute='numeric' />
                </span>
            )
        } else {
            return (
                <FormattedRelative value={parsed} />
            )
        }
    }

    return getDate();

}

export default FormatDate
