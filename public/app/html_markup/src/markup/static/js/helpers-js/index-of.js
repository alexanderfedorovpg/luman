import { forEach } from './for-each';

/**
 * Получить индекс элемента в наборе
 * @param {HTMLElement} element - элемент
 * @param {NodeList} set - Коллекция HTML элементов
 * @returns {(number | null)} - либо индекс, либо null, если элемента нет в этом наборе
 */
export const indexOf = (element, set) => {
    let index = null;

    forEach(set, (item, ind) => {
        if (item === element) {
            index = ind;
            return;
        }
    });

    return index;
};
