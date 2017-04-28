import styled, { css } from 'styled-components';
import { rem, ifProp } from '../../utils/style';
import { font, color, height as HEIGHT } from '../../constants/style';

/* eslint-disable */
const bgColor = css`
    background-color: ${(props) => (
        props.success ? color.success :
        props.danger ? color.danger :
        props.primary ? color.primary :
        'transparent'
    )}
`;
/* eslint-enable */

const Button = styled.button`
    display: inline-block;
    height: ${({ height }) => height || HEIGHT};
    border: 1px solid #cccccc;

    font-family: ${font.helvetica};
    font-size: ${rem(14)};
    line-height: ${({ height }) => height || HEIGHT};
    font-weight: 700;
    color: #333333;

    outline: 0;
    background: transparent;

    &[disabled] {
        cursor: not-allowed;
    }

    &:not([disabled]):hover {
        color: #fff;
        ${bgColor}
    }

    ${ifProp('active')(css`
        &:not([disabled]) {
            color: #fff;

            ${bgColor}
        }
    `)}

    ${ifProp('danger')(css`
        font-weight: 400;
        color: #666666;
    `)}

    i, svg {
        margin-top: -3px;
        margin-right: 6px;
    }

    ${ifProp('block')`
        display: block;
        width: 100%;
    `}

    ${ifProp('md')`
        width: 214px;
    `}

    ${ifProp('xs')(css`
        padding-left: ${rem(9)};
        padding-right: ${rem(9)};
        &:not([disabled]):hover,
        &:not([disabled]):active {

            &.success {
                border-color: ${color.success};
            }

            &.danger {
                border-color: ${color.danger};
            }

            &.primary {
                border-color: ${color.primary};
            }

        }
    `)}
`;

export default Button;
