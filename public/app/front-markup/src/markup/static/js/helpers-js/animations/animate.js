import { timing } from './timing-functions';

/**
 * Функция для создания анимации
 * @param {Object} options - Объект с настройками
 * @param {number} [options.duration=500] - Длительность анимации
 * @param {function} [options.timing=linear] - Математическая функция для рассчета скорости анимации
 * @param {function} options.draw Функция, - описывающая анимацию
 * @param {function} option.onAnimationEnd функция, - вызываемая после завершения анимации
 */
export const animate = (options) => {

    options = Object.assign({
        duration: 500,
        timing: timing.linear
    }, options);

    let start = performance.now();

    requestAnimationFrame(function frame(time) {
        // timeFraction от 0 до 1
        let timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) {
            timeFraction = 1;
        }

        // текущее состояние анимации
        let progress = options.timing(timeFraction);

        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(frame);
        } else {
            if (typeof options.onAnimationEnd === 'function') {
                setTimeout(() => {
                    options.onAnimationEnd();
                }, 50);
            }
        }

    });
};
