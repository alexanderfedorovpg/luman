import React from 'react'
import styled, { css } from 'styled-components'
import { ifProp, equalProp } from './../../utils/style'
import sprite from './img/96dpi/spritem0tpnpb2ho6g7yn6zuxr.png'
import SvgIcons from './svg.js'

const Icon = styled.i`
    display: inline-block;
    vertical-align: middle;

    background-image: url(${sprite});
    background-size: 149px, 124px;
    background-repeat: no-repeat;

    ${equalProp('type', 'dropdown')`
        background-position: -133px -62px;
        width: 13px;
        height: 8px;
    `}

    ${equalProp('type', 'okay')`
        background-position: -133px -50px;
        width: 14px;
        height: 8px;
    `}

    ${equalProp('type', 'delete')`
        background-position: -133px -35px;
        width: 11px;
        height: 11px;

        &:hover {
            background-position: -133px -20px;
        }
    `}

    ${equalProp('type', 'delete-reverse')`
        background-position: -133px -20px;
        width: 11px;
        height: 11px;
    `}

    ${equalProp('type', 'do-right')`
        background-position: -50px -82px;
        width: 21px;
        height: 21px;

        &:hover {
            background-position: -25px -82px;
        }
    `}

    ${equalProp('type', 'logo')`
        background-position: 0px 0px;
        width: 25px;
        height: 25px;
    `}

    ${equalProp('type', 'logo-light')`
          background-position: 0px 0px;
          width: 65px;
          height: 18px;
    `}

    ${equalProp('type', 'feed')`
        background-position: -83px -26px;
        width: 21px;
        height: 22px;
    `}

    ${equalProp('type', 'view')`
        background-position: -52px -29px;
        width: 22px;
        height: 22px;
    `}

    ${equalProp('type', 'draft')`
        background-position: 0px -82px;
        width: 21px;
        height: 22px;
    `}

    ${equalProp('type', 'ready')`
        background-position: -51px -56px;
        width: 21px;
        height: 22px;
    `}

    ${equalProp('type', 'main')`
        background-position: -75px -82px;
        width: 21px;
        height: 21px;
    `}

    ${equalProp('type', 'tv')`
        background-position: -29px 0px;
        width: 23px;
        height: 24px;
    `}

    ${equalProp('type', 'live')`
        background-position: 0px -29px;
        width: 22px;
        height: 23px;
    `}

    ${equalProp('type', 'tass')`
        background-position: -80px -108px;
        width: 16px;
        height: 16px;
    `}

    ${ifProp(['active', 'feed'])`
        background-position: -83px 0px;
    `}

    ${ifProp(['active', 'view'])`
        background-position: 0px -56px;
    `}

    ${ifProp(['active', 'draft'])`
        background-position: -26px -56px;
    `}

    ${ifProp(['active', 'ready'])`
        background-position: -83px -52px;
    `}

    ${ifProp(['active', 'main'])`
        background-position: -108px 0px;
    `}

    ${ifProp(['active', 'tv'])`
        background-position: -56px 0px;
    `}

    ${ifProp(['active', 'live'])`
        background-position: -26px -29px;
    `}

`

const Render = props => {

    switch (props.type) {
        case 'arrow-right':
            return <SvgIcons.ArrowRight {...props} />

        case 'arrow-right-light':
            return <SvgIcons.ArrowRightLight {...props} />

        case 'hamburger':
            return <SvgIcons.Hamburger {...props} />

        case 'logout':
            return <SvgIcons.Logout {...props} />

        case 'clip':
            return <SvgIcons.Clip {...props} />

        case 'search':
            return <SvgIcons.Search {...props} />

        default:
            // console.log(req(`./${props.type}.png`))
            return <Icon {...props} />
    }
}

Render.PropTypes = {
    type: React.PropTypes.string.isRequired
}

export default Render
