/**
 * Преобразует значения свойств объекта в массив
 * @param {Object} obj - объект для преобразование
 * @returns {Array} массив
 */
export const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);
