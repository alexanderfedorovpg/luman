import React from 'react'
import styled, { css } from 'styled-components'
import { ifProp, equalProp } from './../../utils/style'
import SvgIcons from './svg.js'

export const icons = loadIcons()

const Icon = styled.i`
    display: inline-block;
    vertical-align: middle;


    ${equalProp('type', 'dropdown')(css`
        background-image: url(${icons['dropdown-arrow'].data});
        width: ${icons['dropdown-arrow'].width}px;
        height: ${icons['dropdown-arrow'].height}px;
    `)}

    ${equalProp('type', 'okay')(css`
        background-image: url(${icons.okay.data});
        width: ${icons.okay.width}px;
        height: ${icons.okay.height}px;
    `)}

    ${equalProp('type', 'delete')(css`
        background-image: url(${icons.delete.data});
        width: ${icons.delete.width}px;
        height: ${icons.delete.height}px;

        &:hover {
            background-image: url(${icons['delete-bold'].data});
        }
    `)}

    ${equalProp('type', 'delete-reverse')(css`
        background-image: url(${icons['delete-bold'].data});
        width: ${icons['delete-bold'].width}px;
        height: ${icons['delete-bold'].height}px;
    `)}

    ${equalProp('type', 'delete-lg')(css`
        background-image: url(${icons['delete-lg'].data});
        width: ${icons['delete-lg'].width}px;
        height: ${icons['delete-lg'].height}px;
    `)}

    ${equalProp('type', 'checkbox')(css`
        background-image: url(${icons['checkbox'].data});
        width: ${icons['checkbox'].width}px;
        height: ${icons['checkbox'].height}px;
    `)}

    ${equalProp('type', 'checkbox-hover')(css`
        background-image: url(${icons['checkbox-hover'].data});
        width: ${icons['checkbox-hover'].width}px;
        height: ${icons['checkbox-hover'].height}px;
    `)}

    ${equalProp('type', 'checkbox-active')(css`
        background-image: url(${icons['checkbox-active'].data});
        width: ${icons['checkbox-active'].width}px;
        height: ${icons['checkbox-active'].height}px;
    `)}

    ${equalProp('type', 'checkbox-disabled')(css`
        background-image: url(${icons['checkbox-disabled'].data});
        width: ${icons['checkbox-disabled'].width}px;
        height: ${icons['checkbox-disabled'].height}px;
    `)}

    ${equalProp('type', 'go-right')(css`
        background-image: url(${icons['go-right'].data});
        width: ${icons['go-right'].width}px;
        height: ${icons['go-right'].height}px;

        &:hover {
            background-image: url(${icons['go-right-active'].data});
        }
    `)}

    ${equalProp('type', 'logo')(css`
        background-image: url(${icons.logo.data});
        width: ${icons.logo.width}px;
        height: ${icons.logo.height}px;
    `)}

    ${equalProp('type', 'logo-light')(css`
        background-image: url(${icons['logo-light'].data});
        width: ${icons['logo-light'].width}px;
        height: ${icons['logo-light'].height}px;
    `)}

    ${equalProp('type', 'feed')(css`
        background-image: url(${icons.feed.data});
        width: ${icons.feed.width}px;
        height: ${icons.feed.height}px;
    `)}

    ${equalProp('type', 'view')(css`
        background-image: url(${icons.view.data});
        width: ${icons.view.width}px;
        height: ${icons.view.height}px;
    `)}

    ${equalProp('type', 'draft')(css`
        background-image: url(${icons.draft.data});
        width: ${icons.draft.width}px;
        height: ${icons.draft.height}px;
    `)}

    ${equalProp('type', 'ready')(css`
        background-image: url(${icons.ready.data});
        width: ${icons.ready.width}px;
        height: ${icons.ready.height}px;
    `)}

    ${equalProp('type', 'main')(css`
        background-image: url(${icons.main.data});
        width: ${icons.main.width}px;
        height: ${icons.main.height}px;
    `)}

    ${equalProp('type', 'tv')(css`
        background-image: url(${icons.tv.data});
        width: ${icons.tv.width}px;
        height: ${icons.tv.height}px;
    `)}

    ${equalProp('type', 'live')(css`
        background-image: url(${icons.live.data});
        width: ${icons.live.width}px;
        height: ${icons.live.height}px;
    `)}

    ${equalProp('type', 'tass')(css`
        background-image: url(${icons.tass.data});
        width: ${icons.tass.width}px;
        height: ${icons.tass.height}px;
    `)}

    ${equalProp('type', 'twitter')(css`
        background-image: url(${icons.twitter.data});
        width: ${icons.twitter.width}px;
        height: ${icons.twitter.height}px;
    `)}

    ${equalProp('type', 'facebook')(css`
        background-image: url(${icons.facebook.data});
        width: ${icons.facebook.width}px;
        height: ${icons.facebook.height}px;
    `)}

    ${equalProp('type', 'article')(css`
        background-image: url(${icons.article.data});
        width: ${icons.article.width}px;
        height: ${icons.article.height}px;
    `)}

    ${equalProp('type', 'video')(css`
        background-image: url(${icons.video.data});
        width: ${icons.video.width}px;
        height: ${icons.video.height}px;
    `)}

    ${equalProp('type', 'programms')(css`
        background-image: url(${icons.programms.data});
        width: ${icons.programms.width}px;
        height: ${icons.programms.height}px;
    `)}

    ${equalProp('type', 'summary')(css`
        background-image: url(${icons.summary.data});
        width: ${icons.summary.width}px;
        height: ${icons.summary.height}px;
    `)}

    ${props => {
        return props.active
            ? css`
                ${props.type === 'feed' && `background-image: url(${icons['feed-active'].data});`}
                ${props.type === 'view' && `background-image: url(${icons['view-active'].data});`}
                ${props.type === 'draft' && `background-image: url(${icons['draft-active'].data});`}
                ${props.type === 'ready' && `background-image: url(${icons['ready-active'].data});`}
                ${props.type === 'main' && `background-image: url(${icons['main-active'].data});`}
                ${props.type === 'tv' && `background-image: url(${icons['tv-active'].data});`}
                ${props.type === 'live' && `background-image: url(${icons['live-active'].data});`}
            `
            : ''
    }}
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
            return <Icon {...props} />
    }
}

Render.PropTypes = {
    type: React.PropTypes.string.isRequired
}

export default Render

/////////////

function getPngDimensions(base64) {
  let header = base64.slice(0, 50)
  let uint8 = Uint8Array.from(atob(header), c => c.charCodeAt(0))
  let dataView = new DataView(uint8.buffer, 0, 28)

  return {
    width: dataView.getInt32(16),
    height: dataView.getInt32(20)
  }
}

function loadIcons() {
    let req = require.context('./img/96dpi', true, /\.png$/)

    return req.keys().map(key => {
        let data = req(key)
        let name = key.replace(/\.png$/g, '').replace(/^\.\//g, '')
        let dimensions = getPngDimensions(data.split(',')[1])
        return {
            name,
            data,
            ...dimensions
        }
    }).reduce((acc, item) => ({ [item.name]: item, ...acc }), {})
}
