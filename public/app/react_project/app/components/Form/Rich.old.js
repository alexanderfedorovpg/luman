import React, { PureComponent } from 'react'
import styled from 'styled-components'
import ReactQuill, { Quill } from 'react-quill'
import Emitter from 'quill/core/emitter' // RIP build
import Delta from 'quill-delta'

import ContentModal from 'components/Modal/ContentModal'

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
        handlers: {
            image: function (value) {
                this.quill.theme.tooltip.edit('image');
                // let fileInput = this.container.querySelector('input.ql-image[type=file]');
                // if (fileInput == null) {
                //     fileInput = document.createElement('input');
                //     fileInput.setAttribute('type', 'file');
                //     fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon, image/svg+xml');
                //     fileInput.classList.add('ql-image');
                //     fileInput.addEventListener('change', () => {
                //       if (fileInput.files != null && fileInput.files[0] != null) {
                //         imageHandler(fileInput.files[0], (result) => {
                //         // let reader = new FileReader();
                //         // reader.onload = (e) => {
                //           let range = this.quill.getSelection(true);
                //           this.quill.updateContents(new Delta()
                //             .retain(range.index)
                //             .delete(range.length)
                //             .insert({ image: result })
                //           , Emitter.sources.USER);
                //           fileInput.value = '';
                //         });
                //         // reader.readAsDataURL(fileInput.files[0]);
                //       }
                //     });
                //     this.container.appendChild(fileInput);
                // }
                // fileInput.click();
            }
        }
    },
};

// function imageHandler(image, callback) {
//     let reader = new FileReader();
//     reader.onload = (e) => callback(e.target.result);
//     reader.readAsDataURL(image);
// }

const ImageBlot = Quill.import('formats/image')

class ExtImage extends ImageBlot {
    constructor(props) {
        super(props);


    }

    static create(value) {
        let node = super.create(value);

        console.log(value, super.create)
        return node;
    }
}

Quill.register('formats/image', ExtImage, true)

class Rich extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        }

        this.openModal = ::this.openModal
        this.closeModal = ::this.closeModal
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
                        this.openModal();
                        console.log(this)
                    }
                }
            }
        }
    }

    render() {

        return (
            <div>
                <ReactQuill
                    {...this.props}
                    modules={this.getModulesConfig()} />

                <ContentModal
                    isOpen={this.state.modalOpen}
                    onRequestClose={this.closeModal}
                    title="Выберите изображение"
                    contentLabel="Выберите изображение">

                    Content
                </ContentModal>
            </div>
        )
    }
}

export default Rich
