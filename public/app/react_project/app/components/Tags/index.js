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
    padding: 4px 10px 0 10px;

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
            checked: []
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        let value = e.target.value
        let index = this.state.checked.indexOf(value)

        if (index > -1) {
            this.setState({
                checked: [
                    ...this.state.checked.slice(0, index),
                    ...this.state.checked.slice(index+1)
                ]
            })
        }
        else {
            this.setState({
                checked: [
                    ...this.state.checked,
                    value
                ]
            })
        }
    }

    render() {
        let { data } = this.props
        let { checked } = this.state

        return (
            <Root>
                {data.map(tag => {
                    if (!tag) return null

                    return (
                        <Item key={tag}>
                            <Label checked={checked.indexOf(tag) > -1}>
                                <CustomInput
                                    type="checkbox"
                                    name="tags"
                                    value={tag}
                                    checked={checked.indexOf(tag) > -1}
                                    onChange={this.handleChange} />

                                <span>
                                    {tag}
                                </span>
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
