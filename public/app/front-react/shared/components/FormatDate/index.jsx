import React from 'react';
import { FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import { convertToLocaleTime } from 'shared/utils/date';

import './style.scss';

const twoDays = 172800000;

function FormatDate({ value }) {
    const now = new Date();
    const date = convertToLocaleTime(value);

    if (!date) {
        return null;
    }

    return now.getTime() - date.getTime() >= twoDays
        ? (
            <span className="format-date">
                <FormattedDate
                    value={date}
                    year="numeric"
                    month="long"
                    day="2-digit"
                />
                <FormattedTime
                    value={date}
                    hour="numeric"
                    minute="numeric"
                />
            </span>
        )
        : (
            <FormattedRelative value={date} />
        );
}

export default FormatDate;
