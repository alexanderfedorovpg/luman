import React, { Component } from 'react'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

import { Left, Right, Bot } from 'components/Header'

import {
    Horizontal as FormHorizontal,
    InputIcon
} from 'components/Form'

import Icon from 'components/Icon'
import Help from 'containers/Help'
import Button from 'components/Button'

import { padding, font } from 'constants/style'

const ConstructorBot = styled(Bot)`
    .war-mode & {
        background: #c00;
    }
`

const ConstrutorLeft = styled(Left)`
    flex-grow: 0;
    width: 41.8%;
    padding-right: 0.5625rem;
`
const ConstrutorRight = styled(Right)`
    flex-basis: 41.584%;
    width: 41.584%;
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

    color: #666;
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

        this.handleSearchChange = ::this.handleSearchChange
        this.onFilterChange = debounce(this.props.onFilterChange, 500)
    }

    handleSearchChange(e) {
        this.setState({
            form: {
                ...this.state.form,
                search: e.target.value
            }
        }, ()=>this.onFilterChange(this.state.form))
    }

    render() {
        let { moved, onSearchChange, onSave, onCancel, onFilterChange } = this.props

        return (
            <ConstructorBot moved={moved}>
                <ConstrutorLeft>
                    <Form>
                        <FormHorizontal>
                            <FormInput
                                placeholder="Ключевые слова"
                                block
                                icon="search"
                                onChange={this.handleSearchChange}
                                value={this.state.form.search || ''} />
                        </FormHorizontal>
                    </Form>
                </ConstrutorLeft>
                <ConstrutorRight>
                    <CustomButton xs danger onClick={e=>onCancel()}>
                        <Icon type="arrow-left" />
                        Отменить изменения
                    </CustomButton>
                    <CustomButton xs primary>

                        Предпросмотр
                    </CustomButton>
                    <CustomButton xs success onClick={e=>onSave()}>
                        <Icon type="okay" />
                        Сохранить
                    </CustomButton>
                </ConstrutorRight>
            </ConstructorBot>
        )
    }
}

export default Header
