import styled, { css } from 'styled-components';
import { rem, ifProp } from '../../utils/style';
import { font, color, height as HEIGHT } from '../../constants/style';

/* eslint-disable */
const activeColor = css`
    ${(props) => (
        props.success ? color.success :
        props.danger ? color.danger :
        props.primary ? color.primary :
        'transparent'
    )}
`;
/* eslint-enable */

const calcLH = (height) => `${(parseInt(height, 10) - 2)}px`;

const Button = styled.button`
    display: inline-block;
    height: ${({ height }) => height || HEIGHT};
    border: 1px solid #cccccc;
    padding: 0;

    font-family: ${font.helvetica};
    font-size: ${rem(14)};
    line-height: ${({ height }) => height ? calcLH(height) : calcLH(HEIGHT)};
    font-weight: 700;
    color: #333333;

    outline: 0;
    background: transparent;

    &[disabled] {
        color: rgba(51, 51, 51, .4);
        cursor: not-allowed;
    }

    &:not([disabled]):hover {
        color: #fff;
        background-color: ${activeColor};
    }

    ${ifProp('active')(css`
        &:not([disabled]) {
            color: ${activeColor};
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
