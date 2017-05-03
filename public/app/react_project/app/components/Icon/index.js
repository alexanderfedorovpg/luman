import React from 'react';
import styled, { css } from 'styled-components';
import { equalProp } from './../../utils/style';
import SvgIcons from './svg';

export const icons = loadIcons();

const Icon = styled.i`
    display: inline-block;
    vertical-align: middle;

    ${Object.keys(icons).map((icon) => (
        equalProp('type', icon)(css`
            background-image: url(${icons[icon].data});
            width: ${icons[icon].width}px;
            height: ${icons[icon].height}px;
        `)
    ))}

    ${equalProp('type', 'delete')(css`
        &:hover {
            background-image: url(${icons['delete-bold'].data});
        }
    `)}

    ${equalProp('type', 'go-right')(css`
        &:hover {
            background-image: url(${icons['go-right-active'].data});
        }
    `)}

    ${equalProp('type', 'images')(css`
        margin-top: -3px;
    `)}

    ${equalProp('type', 'text-bold')(css`
        &:hover {
            background-image: url(${icons['text-bold-active'].data});
        }
    `)}

    ${equalProp('type', 'text-italic')(css`
        &:hover {
            background-image: url(${icons['text-italic-active'].data});
        }
    `)}

    ${equalProp('type', 'text-video')(css`
        &:hover {
            background-image: url(${icons['text-video-active'].data});
        }
    `)}

    ${equalProp('type', 'orph')(css`
        &:hover {
            height: ${icons['orph-active'].height}px;
            background-image: url(${icons['orph-active'].data});
        }
    `)}

    ${(props) => (
        props.active
            ? css`
                background-image: url(${icons[`${props.type}-active`].data});
            `
            : ''
    )}

    ${equalProp('type', 'dropdown-arrow')(css`
        background-image: url(${icons['dropdown-arrow'].data})
    `)}
`;

const Render = (props) => {
    switch (props.type) {
        case 'arrow-left':
            return <SvgIcons.ArrowLeft {...props} />;

        case 'arrow-right':
            return <SvgIcons.ArrowRight {...props} />;

        case 'arrow-right-light':
            return <SvgIcons.ArrowRightLight {...props} />;

        case 'hamburger':
            return <SvgIcons.Hamburger {...props} />;

        case 'logout':
            return <SvgIcons.Logout {...props} />;

        case 'clip':
            return <SvgIcons.Clip {...props} />;

        case 'search':
            return <SvgIcons.Search {...props} />;

        case 'calendar':
            return <SvgIcons.Calendar {...props} />;

        case 'file':
            return <SvgIcons.File {...props} />;

        case 'dynamic':
            return <SvgIcons.Dynamic {...props} />;

        default:
            return <Icon {...props} />;
    }
};

Render.propTypes = {
    type: React.PropTypes.string.isRequired,
};

export default Render;

// ========================================================================

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
