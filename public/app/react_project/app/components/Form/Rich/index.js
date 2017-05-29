import React, { PureComponent } from 'react'
import styled from 'styled-components'
import ReactQuill, { Quill } from 'react-quill'
import Delta from 'quill-delta'

import ContentModal from 'components/Modal/ContentModal'
import ImageUploadForm from './Form'

import * as api from 'api'

import 'quill/dist/quill.snow.css'

const toolbarContainer = [
    [
        { 'header': [1, 2, 3, 4, 5, 6, false] },
        'bold',
        'italic',
        'underline',
        'link',
    ],
    [
        { 'list': 'ordered' },
        { 'list': 'bullet' },
    ],
    [
        'image',
        'video'
    ],
    [
        'code-block',
        'blockquote',
    ],
    [
        'clean'
    ]
];

const modules = {
    toolbar: {
        container: toolbarContainer,
        handlers: {}
    },
};


const ImageBlot = Quill.import('formats/image')

class ExtImage extends ImageBlot {

    static create(value) {
        let node = super.create(value);
        let info = document.createElement('figcaption')
        info.classList.add('photo__info')
        let title = document.createElement('figcaption')
        title.classList.add('photo__title')

        if (node.nodeName.toLowerCase() == 'img') {
            let figure = document.createElement('figure')

            node.setAttribute('src', this.sanitize(value.src));
            if (value.title) {
                node.setAttribute('alt', value.title);
                node.setAttribute('title', value.title);
            }

            figure.appendChild(node)
            figure.appendChild(title)
            figure.appendChild(info)
            info.textContent = value.title
            info.textContent = `Фото: ${value.author} / ${value.source}`

            figure.dataset.title = value.title;
            figure.dataset.author = value.author;
            figure.dataset.source = value.source;

            node = figure
        }
        else {
            let img = document.createElement('img')
            img.setAttribute('src', this.sanitize(value.src));
            if (value.title) {
                img.setAttribute('alt', value.title);
                img.setAttribute('title', value.title);
            }

            node.appendChild(img);

            node.appendChild(title)
            title.textContent = value.title

            node.appendChild(info)
            info.textContent = `Фото: ${value.author} / ${value.source}`

            node.dataset.title = value.title;
            node.dataset.author = value.author;
            node.dataset.source = value.source;
        }

        node.classList.add('photo')

        return node;
    }

    static value(domNode) {
        const img = domNode.nodeName.toLowerCase() == 'img'
            ? domNode
            : domNode.querySelector('img')

        return {
            src: img.getAttribute('src'),
            title: domNode.dataset.title,
            author: domNode.dataset.author,
            source: domNode.dataset.source,
        };
    }
}
ExtImage.tagName = 'FIGURE';

Quill.register('formats/image', ExtImage, true)

class Rich extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        }

        this.openModal = ::this.openModal
        this.closeModal = ::this.closeModal
        this.submitHandler = ::this.submitHandler
        this.toolbarImageHandler = ::this.toolbarImageHandler
    }

    openModal() {
        this.setState({
            modalOpen: true
        })
    }

    closeModal() {
        this.setState({
            modalOpen: false
        })
    }

    getModulesConfig() {
        return {
            toolbar: {
                container: toolbarContainer,
                handlers: {
                    image: value => {
                    }
                }
            }
        }
    }

    toolbarImageHandler(value) {
        this.openModal();
    }

    uploadImage(image, data, cb) {
        api.uploadFile(
            image,
            {
                object_name: data.title,
                object_author: data.author,
                object_source: data.source
            }
        ).then(({ data: { file } }) => cb(file.url))
    }

    addImage(data, cb) {
        if (data.image != null && data.image[0] != null) {
            this.uploadImage(data.image[0], data, (result) => {
                let editor = this.quill.getEditor();
                let range = editor.getSelection(true);
                editor.updateContents(
                    new Delta()
                        .retain(range.index)
                        .delete(range.length)
                        .insert({ image: { src: result, ...data }}),
                    'user'
                );

                cb();
            });
        }
    }

    submitHandler(data) {
        const values = data.toJS()
        this.addImage(
            values,
            () => {
                this.closeModal()
            }
        )
    }

    render() {


        return (
            <div>
                <ReactQuill
                    ref={(el) => { this.quill = el }}
                    {...this.props}
                    modules={{
                        toolbar: {
                            container: toolbarContainer,
                            handlers: {
                                image: this.toolbarImageHandler
                            }
                        },
                    }} />

                <ContentModal
                    isOpen={this.state.modalOpen}
                    onRequestClose={this.closeModal}
                    title="Выберите изображение"
                    contentLabel="Выберите изображение">

                    <ImageUploadForm onSubmit={this.submitHandler} />
                </ContentModal>
            </div>
        )
    }
}

export default Rich
