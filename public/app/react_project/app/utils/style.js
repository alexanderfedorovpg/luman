import { css } from 'styled-components';

export const rem = (num) => {
    const stripUnit = num / ((num * 0) + 1);
    return `${stripUnit / 16}rem`;
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
