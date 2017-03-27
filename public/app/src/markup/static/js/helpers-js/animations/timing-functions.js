// ============================= Animation timing functions =======================================

export const timing = {
    quad(progress) {
        return Math.pow(progress, 2);
    },

    circ(timeFraction) {
        return 1 - Math.sin(Math.acos(timeFraction));
    },

    back(x, timeFraction) {
        return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
    },

    bounce(timeFraction) {
        for (var a = 0, b = 1, result; 1; a += b, b /= 2) { // eslint-disable-line
            if (timeFraction >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
            }
        }
    },

    elastic(x, timeFraction) {
        return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
    },

    linear(timeFraction) {
        return timeFraction;
    }
};
