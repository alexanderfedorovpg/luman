import React from 'react'
import {FormattedRelative, FormattedDate, FormattedTime} from 'react-intl';

import './style.scss';

const twoDays = 172800000;

function FormatDate({value}) {
    const now = new Date();
    let date = null;

    if (value instanceof Date) {
        date = value;
    }
    else if (value instanceof String) {
        // for stupid Safari
        const fixedVal = typeof value === 'string'
            ? value.replace(/-/g, '/')
            : value;

        if (!Date.parse(fixedVal)) {
            return null;
        }

        date = new Date(fixedVal);
    }
    else {
        return null;
    }

    if (!date) {
        return null;
    }

    function getDate () {

        return now.getTime() - date.getTime() >= 172800000
            ? (
                <span className='format-date'>
                    <FormattedDate value={date} year='numeric' month='2-digit' day='2-digit' />
                    <FormattedTime value={date} hour='numeric' minute='numeric' />
                </span>
            )
            : (
                <FormattedRelative value={date} />
            )
    }

    return getDate();

}

export default FormatDate
