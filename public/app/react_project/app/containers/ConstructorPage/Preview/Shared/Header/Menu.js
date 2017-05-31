import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

import { font, color } from 'constants/style'
import { rem } from 'utils/style'

const Root = styled.nav`
    height: 100%;
`

const List = styled.ul`
    display: flex;
    align-items: center;
    height: 100%;

    list-style-type: none;
    padding: 0;
    margin: 0;
`

const Item = styled.li`

    &:not(:last-child) {
        margin-right: ${rem(23)};
    }

    &:first-child {
        margin-right: ${rem(26)};
    }

    a {
        font-family: ${font.stemReg};
        font-size: ${rem(14)};
        line-height: normal;
        color: ${color.white};
        text-decoration: none;
        text-transform: uppercase;
    }
`

function Menu() {

    return (
        <Root>
            <List>
                <Item>
                    <Link to="#" className="top-menu__link">
                        Главное
                    </Link>
                </Item>
                <Item>
                    <Link to="#" className="top-menu__link">
                        Новости
                    </Link>
                </Item>
                <Item>
                    <Link to="#" className="top-menu__link">
                        Инфошум
                    </Link>
                </Item>
            </List>
        </Root>
    )
}

export default Menu
