import React, { Component } from 'react'
import styled from 'styled-components'

import { ifProp, rem } from 'utils/style'
import { font } from 'constants/style'

const Root = styled.div`
    margin-right: 1px;

    label:before {
        ${props => {
            switch (props.rating) {
                case 1:
                    return 'background-color: #fbd78f;'

                case 2:
                    return 'background-color: #fecd4b;'

                case 3:
                    return 'background-color: #ffba00;'

                case 4:
                    return 'background-color: #ff9c00;'

                case 5:
                    return 'background-color: #ff7800;'

                case 6:
                    return 'background-color: #ff4e00;'

                case 7:
                    return 'background-color: #eb1c01;'

                case 8:
                    return `
                        margin-right: 0;
                        background-color: #aa0111;
                    `
            }
        }}
    }
`

const CustomInput = styled.input`
    display: none
`

const Label = styled.label`
    position: relative;

    display: block;
    width: 28px;
    height: 28px;

    font-family: ${font.helvetica};
    font-size: 14px;
    font-weight: 700;
    line-height: 32px;

    color: #ffffff;
    text-align: center;

    cursor: pointer;

    opacity: 0.31;

    &:before {

        content: ' ';

        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        display: block;
        width: 28px;
        height: 28px;

        cursor: pointer;

    }

    &:hover {
        opacity: 1;
    }

    ${ifProp('checked')`
        opacity: 1
    `}
`

const Wrapper = styled.span`
    position: relative
`

function Item({ rating, checked, onChange, className }) {
    let props = {
        type: "radio",
        name: "rating"
    }

    if (onChange) {
        props.onChange = onChange
        props.value = rating
        props.checked =  +checked === rating
    }
    else {
        props.defaultValue = rating
    }

    return (
        <Root key={rating} rating={rating} className={className}>
            <Label checked={+checked === rating}>
                <CustomInput {...props} />
                <Wrapper>{rating}</Wrapper>
            </Label>
        </Root>
    )
}

export default Item
