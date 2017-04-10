import React, { PureComponent } from 'react'
import styled from 'styled-components'
import ClickOutside from 'react-click-outside'

import { InputIcon } from './Input'
import Icon from './../Icon'

import { ifProp } from './../../utils/style'
import { font } from './../../constants/style'

const Root = styled.div`
    position: relative;
`

const Options = styled.div`
    position: absolute;
    z-index: 8;
    top: 100%;
    left: 0;
    right: 0;
    display: none;

    background-color: #fff;

    ${ifProp('open')`
        display: block
    `}
`

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 3px 19px 5px 2px;

    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;

        span {
            display: block;
        }

        p {
            color: #333333;
            font-weight: 600;
        }

    }
`

const Pic = styled.div`
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    margin-right: 11px;

    img {
        max-width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const Text = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    p {
        margin: 0;

        font-family: ${font.opensans};
        font-size: 14px;
        color: #666666;
        font-weight: 400;
    }

    span {
        display: none;

        color: #999999;
        font-family: ${font.opensans};
        font-size: 12px;
        font-weight: 300;
    }
`

class Select extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            value: {
                name: '',
                id: ''
            }
        }

        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }

    open() {
        if (!this.state.open) {
            this.setState({
                open: true
            })
        }
    }

    close() {
        if (this.state.open) {
            this.setState({
                open: false
            })
        }
    }

    handleClickOutside() {
        this.close()
    }

    selectHandler(item) {
        this.setState({
            value: item
        })

        this.close();

        (this.props.onChange || (()=>{}))(item)
    }

    render() {
        let { icon, options, error } = this.props

        return (
            <Root className={this.props.className} onClick={this.open}>
                <InputIcon
                    icon={icon}
                    value={this.state.value.name}
                    error={error}
                    block />
                <input
                    type="hidden"
                    name={this.props.name}
                    value={this.state.value.id} />

                <Options open={this.state.open}>
                    {options.map((option, index) => {
                        return (
                            <Item
                                key={index}
                                onClick={this.selectHandler.bind(this, option)}>

                                <Pic>
                                    <img src={option.pic} />
                                </Pic>
                                <Text>
                                    <p>{option.name}</p>
                                    <span>Выбрать</span>
                                </Text>
                            </Item>
                        )
                    })}
                </Options>
            </Root>
        )
    }
}

export default ClickOutside(Select)
