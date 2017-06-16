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
    else if (typeof value === 'string') {
        // for stupid Safari
        const fixedVal = value.replace(/-/g, '/');

        date = Date.parse(fixedVal) && new Date(fixedVal);
    }
    else {
        return null;
    }

    if (!date) {
        return null;
    }

    return now.getTime() - date.getTime() >= twoDays
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

export default FormatDate
