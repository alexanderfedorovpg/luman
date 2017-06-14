import React from 'react'
import {FormattedRelative, FormattedDate, FormattedTime} from 'react-intl';

import './style.scss';

const twoDays = 172800000;

function FormatDate({value}) {
    // for stupid Safari
    const fixedVal = value.replace(/-/g, '/');

    if (!Date.parse(fixedVal)) {
        return null;
    }

    const date = new Date(fixedVal);
    const now = new Date();

    function getDate () {
        if (now.getTime() - date.getTime() >= 172800000) {
            // return (
            //     <span>{date.toLocaleDateString()} {date.getHours()}:{date.getMinutes()}</span>
            // )
            return (
                <span className='format-date'>
                    <FormattedDate value={fixedVal} year='numeric' month='2-digit' day='2-digit' />
                    <FormattedTime value={fixedVal} hour='numeric' minute='numeric' />
                </span>
            )
        } else {
            return (
                <FormattedRelative value={fixedVal} />
            )
        }
    }

    return getDate();

}

export default FormatDate
