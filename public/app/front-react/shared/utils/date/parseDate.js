export default function (date) {
    let dateObj = null;

    if (date instanceof Date) {
        dateObj = date;
    } else {
        // for stupid Safari
        const fixedDate = typeof date === 'string' ? date.replace(/-/g, '/') : date;
        dateObj = new Date(fixedDate);
        dateObj = isNaN(dateObj.getTime()) ? null : dateObj;
    }

    return dateObj;
}
