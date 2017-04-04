import React, { Component } from 'react'
import styled from 'styled-components'

import { Input } from '../Form'

import { ifProp, rem } from './../../utils/style'
import { font } from './../../constants/style'

const Root = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 29px;
`

const Item = styled.div`
    margin-right: 1px;

    &:nth-child(1) label:before {
        background-color: #fbd78f;
    }

    &:nth-child(2) label:before {
        background-color: #fecd4b;
    }

    &:nth-child(3) label:before {
        background-color: #ffba00;
    }

    &:nth-child(4) label:before {
        background-color: #ff9c00;
    }

    &:nth-child(5) label:before {
        background-color: #ff7800;
    }

    &:nth-child(6) label:before {
        background-color: #ff4e00;
    }

    &:nth-child(7) label:before {
        background-color: #eb1c01;
    }

    &:nth-child(8) label:before {
        margin-right: 0;

        background-color: #aa0111;
    }
`

const CustomInput = styled(Input)`
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
        z-index: -1;
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

class Rating extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: props.value || null
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        let value = e.target.value

        if (value !== this.state.checked) {
            this.setState({
                checked: value
            })
        }
    }

    render() {
        let { value } = this.props
        let { checked } = this.state

        return (
            <Root>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(rating => {
                    return (
                        <Item key={rating}>
                            <Label checked={+checked === rating}>
                                <CustomInput
                                    type="radio"
                                    name="rating"
                                    value={rating}
                                    onChange={this.handleChange} />
                                {rating}
                            </Label>
                        </Item>
                    )
                })}
            </Root>
        )
    }
}

Rating.PropTypes = {
    value: React.PropTypes.number
}

export default Rating


// +e.SPAN.item
//             input#rate1(type="radio" name="rating")
//             label(for="rate1") 1
