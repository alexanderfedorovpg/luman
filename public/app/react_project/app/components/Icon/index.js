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



// <<<<<<< Updated upstream
// =======
//     ${equalProp('type', 'crop')(css`
//         background-image: url(${icons['crop'].data});
//         width: ${icons['crop'].width}px;
//         height: ${icons['crop'].height}px;

//         &:hover {
//             background-image: url(${icons['crop-active'].data});
//         }
//     `)}

//     ${equalProp('type', 'rotate')(css`
//         background-image: url(${icons['rotate'].data});
//         width: ${icons['rotate'].width}px;
//         height: ${icons['rotate'].height}px;

//         &:hover {
//             background-image: url(${icons['rotate-active'].data});
//         }
//     `)}

//     ${equalProp('type', 'resize')(css`
//         background-image: url(${icons['resize'].data});
//         width: ${icons['resize'].width}px;
//         height: ${icons['resize'].height}px;

//         &:hover {
//             background-image: url(${icons['resize-active'].data});
//         }
//     `)}

//     ${equalProp('type', 'logo')(css`
//         background-image: url(${icons.logo.data});
//         width: ${icons.logo.width}px;
//         height: ${icons.logo.height}px;
//     `)}

//     ${equalProp('type', 'logo-light')(css`
//         background-image: url(${icons['logo-light'].data});
//         width: ${icons['logo-light'].width}px;
//         height: ${icons['logo-light'].height}px;
//     `)}

//     ${equalProp('type', 'feed')(css`
//         background-image: url(${icons.feed.data});
//         width: ${icons.feed.width}px;
//         height: ${icons.feed.height}px;
//     `)}

//     ${equalProp('type', 'view')(css`
//         background-image: url(${icons.view.data});
//         width: ${icons.view.width}px;
//         height: ${icons.view.height}px;
//     `)}

//     ${equalProp('type', 'draft')(css`
//         background-image: url(${icons.draft.data});
//         width: ${icons.draft.width}px;
//         height: ${icons.draft.height}px;
//     `)}

//     ${equalProp('type', 'ready')(css`
//         background-image: url(${icons.ready.data});
//         width: ${icons.ready.width}px;
//         height: ${icons.ready.height}px;
//     `)}

//     ${equalProp('type', 'main')(css`
//         background-image: url(${icons.main.data});
//         width: ${icons.main.width}px;
//         height: ${icons.main.height}px;
//     `)}

//     ${equalProp('type', 'tv')(css`
//         background-image: url(${icons.tv.data});
//         width: ${icons.tv.width}px;
//         height: ${icons.tv.height}px;
//     `)}

//     ${equalProp('type', 'live')(css`
//         background-image: url(${icons.live.data});
//         width: ${icons.live.width}px;
//         height: ${icons.live.height}px;
//     `)}

//     ${equalProp('type', 'tass')(css`
//         background-image: url(${icons.tass.data});
//         width: ${icons.tass.width}px;
//         height: ${icons.tass.height}px;
//     `)}

//     ${equalProp('type', 'twitter')(css`
//         background-image: url(${icons.twitter.data});
//         width: ${icons.twitter.width}px;
//         height: ${icons.twitter.height}px;
//     `)}

//     ${equalProp('type', 'facebook')(css`
//         background-image: url(${icons.facebook.data});
//         width: ${icons.facebook.width}px;
//         height: ${icons.facebook.height}px;
//     `)}

//     ${equalProp('type', 'article')(css`
//         background-image: url(${icons.article.data});
//         width: ${icons.article.width}px;
//         height: ${icons.article.height}px;
//     `)}

//     ${equalProp('type', 'video')(css`
//         background-image: url(${icons.video.data});
//         width: ${icons.video.width}px;
//         height: ${icons.video.height}px;
//     `)}

//     ${equalProp('type', 'programms')(css`
//         background-image: url(${icons.programms.data});
//         width: ${icons.programms.width}px;
//         height: ${icons.programms.height}px;
//     `)}

//     ${equalProp('type', 'summary')(css`
//         background-image: url(${icons.summary.data});
//         width: ${icons.summary.width}px;
//         height: ${icons.summary.height}px;
//     `)}

//     ${equalProp('type', 'text-video-lg')(css`
//         background-image: url(${icons['text-video-lg'].data});
//         width: ${icons['text-video-lg'].width}px;
//         height: ${icons['text-video-lg'].height}px;
//     `)}

//     ${equalProp('type', 'image')(css`
//         background-image: url(${icons['image'].data});
//         width: ${icons['image'].width}px;
//         height: ${icons['image'].height}px;
//     `)}

// >>>>>>> Stashed changes
