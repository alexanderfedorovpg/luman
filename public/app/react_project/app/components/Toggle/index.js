import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { ifProp } from 'utils/style'

const Root = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const Item = styled.span`
    padding-right: 12px;
    padding-left: 12px;
    margin-right: 4px;

    font-family: $helvetica;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #666;

    border: 1px solid transparent;

    border-radius: 30px;
    cursor: pointer;

    &:hover {
        border-color: #cccccc;
    }

    ${ifProp('active')`
        color: #000;

        background-color: #ffffff;
    `}

    &:last-child {
        margin-right: 0;
    }
`

class Toggle extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            checked: (props.value || props.data[0] || {}).id
        }
    }

    handleClick(value) {
        return e => {
            this.setState({
                checked: value.id
            }, ()=>this.props.onChange(value))
        }
    }

    render() {
        let { data } = this.props
        let { checked } = this.state

        return (
            <Root>
                {data.map(value => (
                    <Item
                        onClick={this.handleClick(value)}
                        active={value.id == checked}
                        key={value.id}>

                        {value.title}
                    </Item>
                ))}
            </Root>
        )
    }
}

export default Toggle
