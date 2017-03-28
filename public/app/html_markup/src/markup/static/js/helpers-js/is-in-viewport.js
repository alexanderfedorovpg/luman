/**
 * Проверяет, находится ли элемент в области просмотра
 * @param {HTMLElement} elem - элемент
 * @returns {boolean}
 */
export const isInViewport = (elem, offset = 0) => {
    let coords = elem.getBoundingClientRect(),
        top = coords.top + offset,
        bottom = coords.bottom - offset;

    let windowHeight = document.documentElement.clientHeight;

    // верхняя граница elem в пределах видимости ИЛИ нижняя граница видима ИЛИ центральная
    // часть видима
    let topVisible = top > 0 && top < windowHeight,
        bottomVisible = bottom < windowHeight && bottom > 0,
        centerVisible = top <= 0 && bottom >= windowHeight;

    return topVisible || bottomVisible || centerVisible;
};
