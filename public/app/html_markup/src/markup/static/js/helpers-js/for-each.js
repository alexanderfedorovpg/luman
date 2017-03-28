/**
 * forEach для node list
 * @param {NodeList} list - Коллекция HTML элементов
 * @param {function} callback - Функция, которая должна быть вызвана для каэждого элемента в коллекции
 */
export const forEach = (list, callback) => {
    Array.prototype.forEach.call(list, callback);
};
