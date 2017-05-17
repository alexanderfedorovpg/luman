import { css } from 'styled-components';

export const rem = (num) => {
    const stripUnit = parseInt(num, 10);
    return `${stripUnit / 16}rem`;
};

export const em = (num, parent = 16) => {
    const stripUnit = parseInt(num, 10);
    return `${stripUnit / parent}em`;
};

export const below = (width, orientation = 'width') => (...args) => css`
        @media screen and (max-${orientation}: ${width}) {
            ${css(...args)}
        }
    `;

export const ifProp = (propNames) => {
    const names = Array.isArray(propNames) ? propNames : [propNames];
    return (content) => (props) => names.find((name) =>
        !props[name])
        ? ''
        : content;
};

export const noProp = (propNames) => {
    const names = Array.isArray(propNames) ? propNames : [propNames];
    return (content) => (props) => names.find((name) =>
        !props[name])
        ? content
        : '';
};

export const equalProp = (propName, value) => (content) => (props) =>
    props[propName] === value
    ? content
    : '';

export const hidden = () => `
    position: absolute;
    clip: rect(0 0 0 0);
    clip: rect(0, 0, 0, 0);

    height: 1px;
    width: 1px;
    padding: 0;
    margin: -1px;
    border: 0;

    overflow: hidden;
`;

export const clearfix = () => `
    &:after {
        content: "";
        display: table;
        clear: both;
    }
`;
