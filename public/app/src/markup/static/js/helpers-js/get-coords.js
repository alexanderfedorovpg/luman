/**
 * Получает координаты элемента в документе
 * @param {HTMLElement} elem - элемент, координаты которого мы хотим получить
 * @returns {Object} - объект с координатами top и left
 */
export const getCoords = (elem) => {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
};
