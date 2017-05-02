export const isAbsolute = url => (url||'').search(/^(http:\/\/|https:\/\/|\/\/)/) > -1

export const ensureAbs = (url = '') => (
    isAbsolute(url)
        ? url
        : `//${url}`
)
