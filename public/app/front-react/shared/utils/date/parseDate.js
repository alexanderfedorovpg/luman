import moment from 'moment';

export default function (date) {
    let dateObj = null;

    if (date instanceof Date) {
        dateObj = date;
    } else {
        // for stupid Safari
        dateObj = moment(date).toDate();
    }

    dateObj = isNaN(dateObj.getTime()) ? null : dateObj;

    return dateObj;
}
