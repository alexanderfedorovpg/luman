import React, { Component } from 'react'
import styled from 'styled-components'

import {
    Left as HeaderLeft,
    Right as HeaderRight,
    Link as HeaderLink,
    Bot as HeaderBot
} from 'components/Header'

import {
    Horizontal as FormHorizontal,
    InputIcon
} from 'components/Form'

import Icon from 'components/Icon'
import Help from 'containers/Help'
import Button from 'components/Button'

import { padding, font } from 'constants/style'

const ConstrutorHeaderLeft = styled(HeaderLeft)`
    flex-grow: 0;
    width: 41.8%;
    padding-right: 0.5625rem;
`
const ConstrutorHeaderRight = styled(HeaderRight)`
    flex-basis: 41.584%;
    width: 41.584%;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    padding-left: 0;
`


const Form = styled.form`
    width: 100%;
`

const FormInput = styled(InputIcon) `
    margin-right: 7px;
    // width: 100%;


    &:nth-child(1) {
        flex: 1;
        width: 55.182%;
    }

    &:nth-child(2) {
        width: 37.192%;
    }

    input {
        border: 0;
        outline: 0;
    }
`

const CustomButton = styled(Button) `
    flex: 1;
    margin-right: 7px;

    font-family: ${font.helvetica};
    font-size: 14px;
    font-weight: 400;
    line-height: 34px;

    color: #666666;
    text-align: center;

    background-color: #fff;
    opacity: 1;

    border:0;

    &:last-child {
        margin-right: 0;
    }
`


class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            form: {

            }
        }

        this.onChangeValue = this.onChangeValue.bind(this)
    }


    onChangeValue(prop) {
        return e => {
            this.setState({
                form: {
                    ...this.state.form,
                    [prop]: e.target.value
                }
            })
        }
    }

    render() {
        let { moved, onSearchChange } = this.props

        return (
            <HeaderBot>
                <ConstrutorHeaderLeft>
                    <Form>
                        <FormHorizontal>
                            <FormInput
                                placeholder="Ключевые слова"
                                block
                                icon="search"
                                onChange={this.onChangeValue('keywords')}
                                value={this.state.form.keywords || ''} />
                            {/*<FormButton
                                success xs
                                onClick={e => {
                                    e.preventDefault()
                                    onSearchChange(this.state.form)
                                }}>
                                OK
                            </FormButton>*/}
                        </FormHorizontal>
                    </Form>
                </ConstrutorHeaderLeft>
                <ConstrutorHeaderRight>
                    <CustomButton xs danger >
                        <Icon type="arrow-left" />
                        Отменить изменения
                            </CustomButton>
                    <CustomButton xs primary>

                        Предпросмотр
                            </CustomButton>
                    <CustomButton xs success>
                        <Icon type="okay" />
                        Сохранить
                            </CustomButton>
                </ConstrutorHeaderRight>
            </HeaderBot>
        )
    }
}

export default Header
