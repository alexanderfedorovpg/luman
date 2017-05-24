import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { injectGlobal } from 'styled-components'
import {
    convertFromHTML,
    ContentState,
    convertToRaw,
    EditorState,
    CompositeDecorator
} from 'draft-js'
// import { convertFromHTML } from 'draft-convert';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ImageControl from './ImageControl'
import renderer from './renderer'

injectGlobal`
    .home-wrapper {
        border: 1px solid rgba(204, 204, 204, 0.74);
    }

    .home-editor {
        padding: 15px;
    }

    .rdw-image-modal {
        height: auto !important;
    }
`

const toolbar = {
    image: {
        // component: ImageControl,

        // urlEnabled: false,

        uploadEnabled: true,
        uploadCallback: (file) => {
            return new Promise((resolve, reject) => {

                let reader = new FileReader();
                reader.onload = (e) => {
                    resolve({
                        data: {
                            link: e.target.result
                        }
                    })
                }
                reader.readAsDataURL(file);
            })
        }
    },
}

const decorators = [
    {
        strategy: findImageEntities,
        component: Pic,
    },
];

function Rich({ value, onChange }) {
    const contentBlocks = convertFromHTML(value);
    const contentState = ContentState.createFromBlockArray(
        contentBlocks.contentBlocks,
        contentBlocks.entityMap
    );
console.log('value', contentBlocks)

    return (
        <Editor
            contentState={convertToRaw(contentState)}
            toolbarClassName="home-toolbar"
            wrapperClassName="home-wrapper"
            editorClassName="home-editor"
            toolbar={toolbar}
            customDecorators={decorators}
            customBlockRenderFunc={renderer}
            onChange={val=>onChange(draftToHtml(val, null, false, CustomTransforms))} />
    )
}

export default Rich

function findImageEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
    console.log('block finc', entityKey, character)

            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'IMAGE'
            );
        },
        callback
    );
}

function Pic(props) {
    const data = props.contentState.getEntity(props.entityKey).getData();
console.log('pic', data)

    return (
        null
    );
};

function CustomTransforms(entity) {
    if (!entity) return null

    const data = entity.data || {}

    switch (entity.type) {
        case 'IMAGE':
            const caption = `Фото: ${data.author} / ${data.source}`
            return `
                <figure>
                    <img src="${data.src}" width="${data.width}" height="${data.height}" title="${data.title||''}" alt="${data.title||''}" />
                    ${data.author && data.source &&
                        `<figcaption>${caption}</figcaption>` || ''
                    }
                </figure>
            `
    }

}

const converts = {
    htmlToStyle: (nodeName, node, currentStyle) => {
        if (nodeName === 'span' && node.style.color === 'blue') {
            return currentStyle.add('BLUE');
        } else {
            return currentStyle;
        }
    },
    htmlToEntity: (nodeName, node) => {
        if (nodeName === 'a') {
            return Entity.create(
                'LINK',
                'MUTABLE',
                {url: node.href}
            )
        }

        if (nodeName === 'figure') {
            console.log(node)
            return Entity.create(
                'IMAGE',
                'MUTABLE',
                {
                    src: 'test',
                    width: '150px',
                    height: '150px',
                    source: '123',
                    author: '456'
                }
            )
        }
    },
    textToEntity: (text) => {
        const result = [];
        text.replace(/\@(\w+)/g, (match, name, offset) => {
            const entityKey = Entity.create(
                'AT-MENTION',
                'IMMUTABLE',
                {name}
            );
            result.push({
                entity: entityKey,
                offset,
                length: match.length,
                result: match
            });
        });
        return result;
    },
    htmlToBlock: (nodeName, node) => {
        if (nodeName === 'blockquote') {
            return {
                type: 'blockquote',
                data: {}
            };
        }
    }
}
