import React from 'react'
import styled from 'styled-components'

import { Horizontal } from 'components/Form'
import Button from 'components/Button'
import Icon from 'components/Icon'
import {
    Left,
    Right,
    Link as HeaderLink,
    Bot
} from 'components/Header'

import { font } from 'constants/style'

const Form = styled.div`
    width: 100%
`

const CustomButton = styled(Button)`
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

    &:last-child {
        margin-right: 0;
    }
`

const CustomRight = styled(Right)`
    width: 259px
`

function Header({ moved, del, ret, preview, publish, getFormData }) {

    return (
        <Bot moved={moved}>
            <Left>
                <Form>
                    <Horizontal>
                        <CustomButton xs danger onClick={e=>del()}>
                            <Icon type="delete-reverse" />
                            Удалить
                        </CustomButton>
                        <CustomButton xs danger onClick={e=>ret()}>
                            <Icon type="arrow-left" />
                            Вернуть на правки
                        </CustomButton>
                        <CustomButton xs primary onClick={preview}>
                            Предпросмотр
                        </CustomButton>
                        <CustomButton xs success onClick={e=>publish(getFormData())}>
                            <Icon type="okay" />
                            Опубликовать
                        </CustomButton>
                    </Horizontal>
                </Form>
            </Left>
            <CustomRight>
                <HeaderLink>
                    <span>?</span>
                    Справка
                </HeaderLink>
            </CustomRight>
        </Bot>
    )
}

export default Header
