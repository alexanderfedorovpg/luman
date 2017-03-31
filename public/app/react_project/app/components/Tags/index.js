import React, { Component } from 'react'
import styled from 'styled-components'

import { Input } from '../Form'

import { ifProp, rem } from './../../utils/style'
import { font } from './../../constants/style'

const Root = styled.div`
    margin-top: 5px;
    margin-bottom: 6px;
`

const Item = styled.div`
    display: inline-block;
    margin-right: 3px;
    margin-bottom: 15px;

    vertical-align: middle;

    &:last-child {
        margin-right: 0;
    }
`

const CustomInput = styled(Input)`
    display: none
`

const Label = styled.label`
    display: flex;
    align-items: center;
    height: 24px;
    padding: 0 10px 0 10px;

    font-family: ${font.helvetica};
    font-size: ${rem(14)};
    font-weight: 400;
    color: #666666;
    text-decoration: none;

    border: 1px solid #cccccc;

    border-radius: 15px;
    cursor: pointer;

    &:hover {
        background-color: #f1f1f1;
    }

    ${ifProp('checked')`
        color: #fff;
        border-color: #56647b;
        background-color: #56647b !important;
    `}
`

class Tags extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: null
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
        let { data } = this.props
        let { checked } = this.state

        return (
            <Root>
                {data.map(tag => {
                    return (
                        <Item key={tag}>
                            <Label checked={checked === tag}>
                                <CustomInput
                                    type="radio"
                                    name="tags"
                                    value={tag}
                                    onChange={this.handleChange} />
                                {tag}
                            </Label>
                        </Item>
                    )
                })}
            </Root>
        )
    }
}

Tags.PropTypes = {
    data: React.PropTypes.array.isRequired
}

export default Tags
