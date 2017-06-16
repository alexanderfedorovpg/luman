export const isAbsolute = url => (url||'').search(/^(http:\/\/|https:\/\/|\/\/)/) > -1

export const ensureAbs = (url = '') => (
    isAbsolute(url)
        ? url
        : `//${url}`
)

export const newsLink = article => (
    article
        ? article.top > 4
            ? `/news/${article.code}`
            : `/noise/${article.code}`
        : ''
)

/**
 * заменяет конструкцию вида >>текст>>ссылка>> на ссылку
 * @param text
 * @returns {*}
 */
export const replaceStrToLink = (text) => {
    if (text)
        return text.replace(/&gt;&gt;(.+?)&gt;&gt;(.+?)&gt;&gt;/g, '<a href="$2" target="_blank">$1</a>', 'g')
            .replace(/>>(.+?)>>(.+?)>>/g, '<a href="$2">$1</a>', 'g')
    else
        return text
}