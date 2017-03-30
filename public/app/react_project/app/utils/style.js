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

export const ifProp = propNames => {
    let names = Array.isArray(propNames) ? propNames : [propNames]
    return content => {
        return props => {
            return names.find(name => !props[name])
                ? ''
                : content
        }
    }
}

export const equalProp = (propName, value) => {
    return content => {
        return props => {
            return props[propName] === value
                ? content
                : ''
        }
    }
}
