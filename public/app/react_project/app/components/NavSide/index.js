import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import Badge from '../Badge'

import { ifProp } from './../../utils/style'

const Wrapper = styled.nav`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;

    width: 67px;

    background-color: #000000;
`
const NavItem = styled.a`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;

    border-bottom: 1px solid #000;

    background-color: #181818;

    &:last-child {
        border-color: transparent;
    }

    &:hover {
        background-color: #2e2e2e;
    }

    ${ifProp('active')`
        background-color: #2e2e2e;
    `}

`

const NavBadge = styled(Badge)`
    position: absolute;
    top: 10px;
    right: 13px;
`

function NavSide() {
    return (
        <Wrapper>
            <NavItem href="#">
                <Icon logo />
            </NavItem>
            <NavItem href="#" active>
                <Icon feed active />
            </NavItem>
            <NavItem href="#">
                <Icon view />
            </NavItem>
            <NavItem href="#">
                <Icon draft />
            </NavItem>
            <NavItem href="#">
                <Icon ready />
                <NavBadge success>8</NavBadge>
            </NavItem>
            <NavItem href="#">
                <Icon main />
            </NavItem>
            <NavItem href="#">
                <Icon tv />
                <NavBadge success>2</NavBadge>
            </NavItem>
            <NavItem href="#">
                <Icon live />
                <NavBadge danger>off</NavBadge>
            </NavItem>
        </Wrapper>
    )
}

export default NavSide

// mixin nav-side(data)
//     if pageSettings.navSide
//         +b.NAV.nav-side()&attributes(attributes)
//             +e.A.item.logo(href=jv0)
//                 +e.pic
//                     i.icon.icon-logo
//             +e.A.item.is-active(href=jv0)
//                 +e.pic
//                     i.icon.icon-feed
//                 //- Выбор из ленты

//             +e.A.item(href=jv0)
//                 +e.pic
//                     i.icon.icon-view
//                 //- Просмотр выпускающим

//             +e.A.item(href=jv0)
//                 +e.pic
//                     i.icon.icon-draft
//                 //- В работе

//             +e.A.item(href=jv0)
//                 +e.pic
//                     i.icon.icon-ready
//                 .badge.badge-success 8
//                 //- Готовые

//             +e.A.item(href=jv0)
//                 +e.pic
//                     i.icon.icon-main
//                 //- Главная

//             +e.A.item(href=jv0)
//                 +e.pic
//                     i.icon.icon-tv
//                 .badge.badge-success 2
//                 //- Программы

//             +e.A.item(href=jv0)
//                 +e.pic
//                     i.icon.icon-live
//                 .badge.badge-danger off
//                 //-  Прямой off


// .nav-side {
//     position: fixed;
//     top: 0;
//     bottom: 0;
//     left: 0;

//     width: 67px;

//     background-color: #000000;

//     &__item {
//         position: relative;

//         display: flex;
//         align-items: center;
//         justify-content: center;
//         height: 60px;

//         border-bottom: 1px solid #000;

//         background-color: #181818;

//         &:last-child {
//             border-color: transparent;
//         }

//         &.is-active,
//         &:hover {
//             background-color: #2e2e2e;
//         }
//     }

//     &__item.logo {
//         background-color: #000000;
//     }

//     .badge {
//         position: absolute;
//         top: 10px;
//         right: 13px;
//     }

// }
