import { css } from 'styled-components'

export const rem = num => {
    let stripUnit = num / (num * 0 + 1);
    return `${stripUnit / 16}rem`;
}

export const below = (width, orientation = 'width') => {
    return (...args) => css`
        @media screen and (max-${orientation}: ${width}) {
            ${ css(...args) }
        }
    `
}

export const ifProp = propName => {
    return content => {
        return props => props[propName] ? content : ''
    }
}
