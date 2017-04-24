import React from 'react'

import Help from 'components/Help'
import {
    Left,
    Right,
    Bot
} from 'components/Header'
import Tabs from 'components/Tabs'

function Header({ moved, filter, setFilter, filterData }) {
    const active = (filterData.find(item => item.value === filter)||{}).title

    return (
        <Bot moved={moved}>
            <Left>
                <Tabs data={filterData} onClick={setFilter} active={active} />
            </Left>
            <Right>
                <Help />
            </Right>
        </Bot>
    )
}

export default Header
