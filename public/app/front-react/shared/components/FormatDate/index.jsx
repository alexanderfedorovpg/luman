import React from 'react';
import { FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import { convertToLocaleTime } from 'shared/utils/date';

import './style.scss';

const twoDays = 172800000;

const renderUpdate = (createDate, updateDate) => {
    if (!updateDate) {
        return null;
    }

    const isUpdated = createDate !== updateDate;

    if (!isUpdated) {
        return null;
    }

    const divider = createDate ? '/ ' : '';

    return <span>{divider}Обновлено</span>;
};

function FormatDate({ created, updated }) {
    const now = new Date();
    const date = convertToLocaleTime(created);
    let createdEl = null;

    if (date) {
        createdEl = now.getTime() - date.getTime() >= twoDays ?
        (
            <span>
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
        :
            <FormattedRelative value={date} />;
    }

    return (
        <span className="format-date">
            {createdEl}
            {renderUpdate(created, updated)}
        </span>
    );
}

export default FormatDate;
