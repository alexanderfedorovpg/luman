import styled, { css } from 'styled-components';

import Select from './Select';
import Input, { InputIcon } from './Input';
import FileInput from './FileInput';
import Checkbox from './Checkbox';
import Datepicker from './Datepicker';
import Dropzone from './Dropzone';
import ImageLoader from './ImageLoader';
import Rich from './Rich';

import { ifProp, rem } from 'utils/style';
import { color, font } from 'constants/style';

export { Select, Input, InputIcon, Checkbox, FileInput, Datepicker, Dropzone, ImageLoader, Rich };

export const Horizontal = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

export const Group = styled.div`
    position: relative;

    margin-bottom: ${({ marginBottom }) => marginBottom || '24px'};

    &:last-child {
        margin-bottom: 0;
    }

    ${ifProp('sm')`
        margin-bottom: 15px;
    `}

    ${ifProp('md')`
        margin-bottom: 20px;
    `}

    ${ifProp('horizontal')`
        display: flex;
        align-items: center;
        justify-content: flex-start;
    `}
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 5px;

    letter-spacing: -0.1px;

    span {
        color: #333;

        &.out {
            color: #A00;
        }
    }

    ${ifProp('bold')(css`
        color: #333;
        font-family: ${font.opensans};
        font-size: ${rem(13)};
        font-weight: 700;
        line-height: ${rem(18)};
    `)}

    ${ifProp('light')(css`
        color: #999;
        font-family: ${font.opensans};
        font-size: 12px;
        font-weight: 400;
    `)}

    ${ifProp('error')(css`
        color: ${color.danger};
    `)}

    ${ifProp('right')`
        float: right;
    `}
`;

export const Textarea = styled.textarea`
    padding: 13px 16px;
    border: 1px solid rgba(204, 204, 204, 0.74);

    color: #000000;
    font-family: ${font.opensans};
    font-size: ${rem(21)};
    font-weight: bold;
    line-height: ${rem(26)};

    resize: none;

    &::placeholder {
        color: #ccc;
        opacity: 1;
    }

    &[disabled] {
        background-color: #fff;
    }

    ${ifProp('block')`
        display: block;
        width: 100%;
    `}

    ${ifProp('light')(css`
        min-height: 91px;

        color: #666666;
        font-family: ${font.opensans};
        font-size: ${rem(16)};
        font-weight: 400;
        line-height: ${rem(21)};
    `)}

    ${ifProp('error')(css`
        border-color: ${color.danger};
    `)}

    ${ifProp('success')(css`
        border-color: ${color.success};
    `)}

    ${ifProp('title')(css`
        height: 119px;
        padding-left: 16px;
        padding-right: 16px;

        font-family: ${font.opensans};
        font-weight: 400;
        color: #333;
        font-size: 30px;
        line-height: 34px;
        letter-spacing: -0.7px;
    `)}
`;
