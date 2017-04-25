import React from 'react';
import styled from 'styled-components';


import { font } from 'constants/style';
import { rem, ifProp } from 'utils/style';

const Root = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 0;
`

const Input = styled.input`
    display: none;
`

const Label = styled.label`
    position: relative;
    display: block;
    width: 36px;
    height: 16px;
    padding-left: 43px;
    margin-right: 8px;
    margin-left: 8px;
    padding: 2px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: #cb0813;
    border-radius: 2em;
    outline: 0;
    -webkit-transition: all .4s ease;
    transition: all .4s ease;
    -webkit-box-ordinal-group: 2;
    -ms-flex-order: 1;
    order: 1;

    &:before {
        position: relative;
        display: block;
        content: "";
        width: 50%;
        height: 100%;
        top: 1px;
        left: 5%;
        border-radius: 50%;
        background: #ccc;
        width: 10px;
        height: 10px;
        -webkit-transition: all .2s ease;
        transition: all .2s ease;
    }

    input:checked + & {
        background: #359918;
    }

    input:checked + &:before {
        left: 65%;
    }

`

const Title = styled.span`
    font-family: "Open Sans", Arial, sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #000;

    input:checked + & {
        color: #333;
    }
`

class Tumbler extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Root>
                <Input type="checkbox" id="cb1" />
                <Label for="cb1" />
                <Title>ВОЙНА OFF </Title>
            </Root>
        )
    }
}

export default Tumbler;