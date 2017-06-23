import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';

import { convertToLocaleTime } from 'shared/utils/date';

import './style.scss';

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
    const date = convertToLocaleTime(created);

    return (
        <span className="format-date">
            {
                !!date &&
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
            }
            {renderUpdate(created, updated)}
        </span>
    );
}

export default FormatDate;
