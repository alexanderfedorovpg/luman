import React from 'react'
import styled from 'styled-components'

import {
    Left,
    Right,
    Bot
} from 'components/Header'
import Help from 'components/Help'
import Toggle from 'components/Toggle'
import { InputIcon } from 'components/Form/Input'

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`

const CustomInput = styled(InputIcon)`
    width: 61.6%;
    margin-right: 28px;
`

function Header() {

    return (
        <Bot>
            <Left>
                <Form>
                    <CustomInput icon="search" placeholder="Поиск по готовым материалам" />
                    <Toggle />
                </Form>
            </Left>
            <Right>
                <Help />
            </Right>
        </Bot>
    )
}

export default Header
