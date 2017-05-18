import styled, { css } from 'styled-components';
import { hidden, ifProp } from 'utils/style';
import { color } from 'constants/style';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    font-size: 13px;
    font-weight: 700;
    color: #808080;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const Input = styled.input`
    ${hidden}
`;

export const Label = styled.span`
    color: #808080;

    ${ifProp('checked')(css`
        color: #333;
    `)}

    ${ifProp('on')(css`
        order: -1;

        color: ${({ checked }) => checked ? '#333' : '#808080'};
    `)}

    ${ifProp('off')(css`
        order: 3;

        color: ${({ checked }) => checked ? '#808080' : '#333'};
    `)}
`;

export const Widget = styled.label`
    position: relative;
    display: block;
    width: 36px;
    height: 16px;
    padding-left: 43px;
    margin-right: 8px;
    margin-left: 8px;
    padding: 2px;

    cursor: pointer;
    user-select: none;

    background: ${color.danger};
    border-radius: 2em;
    outline: 0;
    transition: all .4s ease;

    &:after,
    &:before {
        position: relative;
        display: block;
        content: "";
        width: 50%;
        height: 100%;
    }

    &:after {
        top: 1px;
        left: ${({ activePosition }) => activePosition === 'right' ? '5%' : '65%'};
        border-radius: 50%;
        background: #ccc;
        width: 10px;
        height: 10px;
        transition: all .2s ease;
    }

    &:before {
        display: none;
    }

    ${ifProp('checked')(css`
        background: ${color.success};

        &:after {
            left: ${({ activePosition }) => activePosition === 'right' ? '65%' : '5%'};;
        }
    `)}

    ${ifProp('disabled')(css`
        cursor: default;
    `)}
`;

