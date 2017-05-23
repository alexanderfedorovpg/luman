export const isAbsolute = url => (url || '').search(/^(http:\/\/|https:\/\/|\/\/|data:)/) > -1

export const ensureAbs = url => (
    isAbsolute(url)
        ? url
        : `//${url}`
)
