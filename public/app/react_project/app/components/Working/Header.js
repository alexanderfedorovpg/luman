import React, { Component } from 'react'

import {
    Left,
    Right,
    Link as HeaderLink,
    Bot
} from 'components/Header'
import Tabs from 'components/Tabs'

function Header({ moved }) {
    return (
        <Bot>
            <Left>
                <Tabs data={['В работе', 'Зависли']}/>
            </Left>
            <Right>
                <HeaderLink>
                    <span>?</span>
                    Справка
                </HeaderLink>
            </Right>
        </Bot>
    )
}

export default Header
