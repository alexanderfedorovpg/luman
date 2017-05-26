import React from 'react'
import styled from 'styled-components'

import { Horizontal } from 'components/Form'
import Help from 'components/Help'
import Button from 'components/Button'
import Icon from 'components/Icon'
import {
    Left,
    Right,
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

function Header({ moved, del, ret, preview, onSubmit }) {

    return (
        <Bot moved={moved}>
            <Left>
                <Form>
                    <Horizontal>
                        <CustomButton
                            xs danger
                            disabled={!del}
                            onClick={e=>del()}>

                            <Icon type="delete-reverse" />
                            Удалить
                        </CustomButton>
                        <CustomButton
                            xs danger
                            disabled={!ret}
                            onClick={e=>ret()}>

                            <Icon type="arrow-left" />
                            Вернуть на правки
                        </CustomButton>
                        <CustomButton xs primary onClick={preview}>
                            Предпросмотр
                        </CustomButton>
                        <CustomButton xs success onClick={onSubmit}>

                            <Icon type="okay" />
                            Опубликовать
                        </CustomButton>
                    </Horizontal>
                </Form>
            </Left>
            <CustomRight>
                <Help />
            </CustomRight>
        </Bot>
    )
}

export default Header
