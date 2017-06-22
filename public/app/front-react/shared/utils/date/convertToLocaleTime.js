import parseDate from './parseDate';

const MOSCOW_OFFSET = -3 * 60 * 60 * 1000;

export default function (date) {
    const dateObj = parseDate(date);

    if (!dateObj) {
        return null;
    }

    const localeOffset = dateObj.getTimezoneOffset() * 60 * 1000;
    const diff = localeOffset - MOSCOW_OFFSET;

    return new Date(dateObj - diff);
}
