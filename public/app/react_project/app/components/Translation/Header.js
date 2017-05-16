import React from 'react'
import styled from 'styled-components'

import { Bot, Left, Right } from 'components/Header'
import { Horizontal } from 'components/Form'
import Button from 'components/Button'
import Help from 'components/Help'
import Icon from 'components/Icon'

import { font } from 'constants/style'

const CustomButton = styled(Button)`
    flex: 1;
    margin-right: 7px;
    font-family: ${font.helvetica};
    font-size: 14px;
    font-weight: 400;
    line-height: 34px;

    text-align: center;
    background-color: #fff;
    opacity: 1;

    &:not(:last-child) {
        color: #333;
    }

    &:last-child {
        margin-right: 0;
    }
`

const CustomHorizontal = styled(Horizontal)`
    width: 100%;
`

const CustomRight = styled(Right)`
    width: 259px;
`

function Header({ moved, onSubmit }) {

    return (
        <Bot moved={moved}>
            <Left>
                <CustomHorizontal>
                    <CustomButton xs danger>
                        <Icon type="delete-bold" />
                        Удалить
                    </CustomButton>
                    <CustomButton xs danger>
                        Выключить
                    </CustomButton>
                    <CustomButton xs primary>
                        Редактировать
                    </CustomButton>
                    <CustomButton
                        onClick={onSubmit}
                        xs success active>
                        <Icon type="arrow-right" />
                        Опубликовать
                    </CustomButton>
                </CustomHorizontal>
            </Left>
            <CustomRight>
                <Help />
            </CustomRight>
        </Bot>
    )
}

export default Header
