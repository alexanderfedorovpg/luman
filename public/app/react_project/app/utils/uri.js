export const isAbsolute = url => (url || '').search(/^(http:\/\/|https:\/\/|\/\/|data:)/) > -1

export const ensureAbs = url => (
    isAbsolute(url)
        ? url
        : `//${url}`
)
export const isUrl = (url) => /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/.test(url);