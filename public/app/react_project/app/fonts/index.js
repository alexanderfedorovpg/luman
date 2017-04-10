export default (name, path, weight = null, style = null, exts = ['eot', 'woff2', 'woff', 'ttf', 'svg']) => {

    let extmods = {
        eot: '?',
        svg: `#${name.replace(' ', '_')}`
    }

    let formats = {
        otf: 'opentype',
        ttf: 'truetype'
    }

    let req = require.context("./", true)

    let src = exts.map(ext => {
        let extmod = extmods[ext] ? `${ext}${extmods[ext]}` : ext
        let format = formats[ext] || ext

        let font = req(`./${path}.${extmod}`)

        return `url(${font}) format('${format}')`
    })

    return `
        @font-face{
            font-family: '${name}';
            font-style: ${style};
            font-weight: ${weight};
            src: ${src.join(', ')};
        }
    `
}
