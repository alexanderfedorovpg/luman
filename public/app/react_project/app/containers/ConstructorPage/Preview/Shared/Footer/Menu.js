import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

import { rem } from 'utils/style'
import { color } from 'constants/style'

const Root = styled.nav``

const List = styled.ul`
    margin: 0;
    padding: 0;
    font-size: 0;
`

const Item = styled.li`
    display: inline-block;
    list-style-type: none;

    &:nth-of-type(odd) {
        width: 61%;
    }

    &:nth-of-type(even) {
        width: 39%;
    }

    a {
        font-size: ${rem(13)};
        line-height: ${rem(24)};
        color: ${color.white};
        text-decoration: none;
    }
`

function Menu({ className }) {

    return (
        <Root>
            <List>
                {menuData.map(({ title, link }, i) => (
                    <Item key={i}>
                        <Link to={link}>
                            {title}
                        </Link>
                    </Item>
                ))}
            </List>
        </Root>
    )
}

export default Menu

const menuData = [
    {
        title: 'Как смотреть',
        link: '#'
    },
]
