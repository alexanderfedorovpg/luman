import React from 'react';
import styled from 'styled-components';


import { font } from 'constants/style';
import { rem, ifProp } from 'utils/style';

const Root = styled.div`
    display: flex;
    align-items: center;

    &:last-child {
        margin-bottom: 0;
    }

    span {
        font-family: ${font.opensans};
        font-size: 13px;
        font-weight: 700;
        color: #808080;
        width: 77px;
    }

    input {
        display: none;
    }

    label {
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

        background: #cb0813;
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
            left: 5%;
            border-radius: 50%;
            background: #ccc;
            width: 10px;
            height: 10px;
            transition: all .2s ease;
        }

        &:before {
            display: none;
        }
    }

    input:checked ~ label {
        background: #359918;

        &:after {
            left: 65%;
        }

        + span {
            color: #333;
        }
    }

    input[disabled] ~ label {
        cursor: default;

        & + span {
            color: #808080;
        }
    }
`

function Tumbler({ war, onWarModeChange }) {

    return (
        <Root>
            <input
                type="checkbox"
                id="cb1"
                checked={!war}
                onChange={e=>onWarModeChange(!war)} />
            <span>ВОЙНА {war ? 'ON' : 'OFF'}</span>
            <label htmlFor="cb1" />
        </Root>
    )
}

export default Tumbler;
