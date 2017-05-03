export const isAbsolute = url => (url||'').search(/^(http:\/\/|https:\/\/|\/\/)/) > -1

export const ensureAbs = (url = '') => (
    isAbsolute(url)
        ? url
        : `//${url}`
)

export const newsLink = article => (
    article
        ? article.top > 4
            ? `/news/${article.id}`
            : `/noise/${article.id}`
        : ''
)
