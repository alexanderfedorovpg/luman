import React, {PureComponent} from 'react'
import styled from 'styled-components'
import ReactQuill, {Quill} from 'react-quill'
import Delta from 'quill-delta'
import { connect } from 'react-redux';

import {isUrl} from 'utils/uri'
import ContentModal from 'components/Modal/ContentModal'

import * as api from 'api'
import 'quill/dist/quill.snow.css'
import { showPreloader, hidePreloader } from 'containers/App/actions';

import ImageUploadForm from './forms/ImageUploadForm'
import AddEmbedForm from './forms/AddEmbedForm'
import AddHTMLForm from './forms/AddHTMLForm'
import VideoUploadForm from './forms/VideoUploadForm';

import addEmbed from './widgets/AddEmbed'

import extendImageFormat from './format/imageFormat'
import extendTwitterFormat from './format/TwitterFormat'
import extendInstagramFormat from './format/InstagramFormat'
import extendFacebookFormat from './format/FacebookFormat'
import extendHtmlFormat from './format/HTMLFormat'
import extendVideoFormat from './format/videoFormat'
import extendVideoEmbedFormat from './format/videoEmbedFormat'

import playIcon from './video-ico-big.svg'
import videoLogo from './green-rtvi-left.png'
import { rem } from 'utils/style'


/**
 * некий валидатор, который использует редактор, чтобы распознать html,
 * который в него закинули и применить к нему особые инструкции
 */
extendImageFormat(Quill);
extendTwitterFormat(Quill);
extendInstagramFormat(Quill);
extendFacebookFormat(Quill);
extendHtmlFormat(Quill);
extendVideoFormat(Quill);
extendVideoEmbedFormat(Quill);

const Root = styled.div`

    .ql-toolbar.ql-toolbar {
        border-bottom: none;
    }

    .ql-toolbar {
        .ql-embed,
        .ql-html {
            width: auto;
        }
    }

    .ql-editor {
        .video {
            width: ${rem(300)};

            &__preview {
                max-width: 100%;
                height: 100%;
                width: auto;
                object-fit: cover;
                display: block;
            }
            &__preview-wrapper {
                max-height: rem(593);
                width: 100%;
                position: relative;

                &:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: rgba(0, 0, 0, .7);
                }
            }
            &__play {
                background-image: url(${playIcon});
                display: block;
                position: absolute;
                left: calc(50% - 3rem);
                top: calc(50% - 3.75rem);
                width: 6rem;
                height: 6rem;
                border: 1px solid #fff;
            }
            &__logo {
                content: "news";
                display: block;
                position: absolute;
                width: ${rem(147)};
                height: ${rem(85)};
                background-image: url(${videoLogo});
                bottom: 0;
                font-size: ${rem(16)};
                line-height: ${rem(18)};
                color: #fff;
                text-transform: uppercase;
                text-align: right;
                padding-right: 11px;
                padding-top: 7px;
            }
        }
    }
`

class Rich extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            imageModalOpen: false,
            videoModalOpen: false,
            HTMLModalOpen:  false,
            embedModalOpen: false
        }
    }
    openModal = (type) => this.setState({...this.state, [`${type}ModalOpen`]: true})
    closeModal = (type) => this.setState({...this.state, [`${type}ModalOpen`]: false})

    insertText(text) {
        const editor = this.quill.getEditor()

        var range = editor.getSelection();
        if (range) {
            editor.insertText(range.index, text);
            editor.setSelection(range.index + 1);
        }
    }

    toolbarLaquoHandler = () => this.insertText('«')
    toolbarRaquoHandler = () => this.insertText('»')
    toolbarEmDashHandler = () => this.insertText('—')

    // у этой функции quill'овский контекст,
    // т.е. this == quill instance
    toolbarAquosHandler = (value) => {
        let quill = this.quill.getEditor();
        var range = quill.getSelection(true);
        if (range) {
            // +1 т.к. после вставки левой кавычки индекс
            // правой должен увеличиться на 1
            quill.insertText(range.index, '«');
            quill.insertText(range.index + range.length + 1, '»');
            quill.setSelection(range.index + 1, range.length);
        }
    }

    uploadFile(f, data) {
        this.props.showPreloader();
        return api.uploadFile(
            f,
            {
                object_name: data.title,
                object_author: data.author,
                object_source: data.source
            }
        ).then(({ data: { file } }) => {
            this.props.hidePreloader();

            return file.url;
        })
    }

    addImage(data, cb) {
        if (data.image != null && data.image[0] != null) {
            this.uploadFile(data.image[0], data).then((result) => {
                let editor = this.quill.getEditor();
                let range = editor.getSelection(true);
                editor.updateContents(
                    new Delta()
                        .retain(range.index)
                        .delete(range.length)
                        .insert({ 'ext-image': { src: result, ...data }}),
                    'user'
                );
                cb();
            });
        }
    }

    addVideo(data, cb) {
        let videoPromise = data.video != null && data.video[0] != null
            ? this.uploadFile(data.video[0], data)
            : null
        let previewPromise = data.preview != null && data.preview[0] != null
            ? this.uploadFile(data.preview[0], data)
            : null

        if (!videoPromise) return;

        Promise
            .all([videoPromise, previewPromise])
            .then(([video, preview]) => {
                let editor = this.quill.getEditor();
                let range = editor.getSelection(true);
                editor.updateContents(
                    new Delta()
                        .retain(range.index)
                        .delete(range.length)
                        .insert({
                            'ext-video': {
                                src: video,
                                preview_src: preview,
                                ...data
                            }
                        }),
                    'user'
                );

                cb();
            })
    }

    openEmbedModal = () => this.openModal('embed')
    closeEmbedModal = () => this.closeModal('embed')

    openHTMLModal = () => this.openModal('HTML')
    closeHTMLModal = () => this.closeModal('HTML')

    openVideoModal = (value) => this.openModal('video');
    closeVideoModal = (value) => this.closeModal('video');

    openImageModal = (value) => this.openModal('image');
    closeImageModal = (value) => this.closeModal('image');

    submitImageHandler = (data) => {
        const values = data.toJS()
        this.addImage(
            values,
            () => {
                this.closeImageModal()
            }
        )
    }
    submitVideoHandler = (data) => {
        const values = data.toJS()
        this.addVideo(
            values,
            () => {
                this.closeModal('video')
            }
        )
    }
    /**
     * вызовется при добавлении юрл
     * @param data
     */
    submitEmbedHandler = (data) => {
        let quill = this.quill.getEditor();
        let range = quill.getSelection(true).index;
        let url = data.toJS().url;
        addEmbed(quill, url, range, this.closeEmbedModal);
    }

    /**
     * вызовется при добавлении html
     * @param data
     */
    submitHTMLHandler = (data) => {
        data = data.toJS();
        let quill = this.quill.getEditor();
        let range = quill.getSelection(true).index;
        quill.updateContents(
            new Delta()
                .retain(range)
                .insert({html: data.html}),
            'api'
        );
        this.closeHTMLModal();
    }

    render() {
        return (
            <Root>
                <div id="toolbar">
                    <div className="ql-formats">
                        <select className="ql-header">
                            <option value="1"/>
                            <option value="2"/>
                            <option value="3"/>
                            <option value="4"/>
                            <option value="5"/>
                            <option value="6"/>
                            <option />
                        </select>
                        <button className="ql-bold"/>
                        <button className="ql-italic"/>
                        <button className="ql-underline"/>
                        <button className="ql-link"/>
                    </div>
                    <div className="ql-formats">
                        <button className="ql-list" value="ordered"/>
                        <button className="ql-list" value="bullet"/>
                    </div>
                    <div className="ql-formats">
                        <button className="ql-image"/>
                        <button className="ql-video"/>
                    </div>
                    <div className="ql-formats">
                        <button className="ql-code-block"/>
                        <button className="ql-blockquote"/>
                    </div>
                    <div className="ql-formats">
                        <button className="ql-clean"/>
                    </div>
                    <div className="ql-formats">
                        <button className="ql-laquo" title="Ctrl + 2">«</button>
                        <button className="ql-raquo" title="Ctrl + 3">»</button>
                        <button className="ql-aquos" title="Ctrl + 4">«»</button>
                        <button className="ql-em-dash" title="Ctrl + 1">—</button>
                    </div>
                    <div className="ql-formats">
                        <button className="ql-embed">
                            embed
                        </button>
                    </div>
                    <div className="ql-formats">
                        <button className="ql-html">
                            html
                        </button>
                    </div>
                </div>
                <ReactQuill
                    ref={(el) => { this.quill = el }}
                    {...this.props}
                    modules={{
                        toolbar: {
                            container: '#toolbar',
                            handlers: {
                                image:     this.openImageModal,
                                video:     this.openVideoModal,
                                laquo:     this.toolbarLaquoHandler,
                                raquo:     this.toolbarRaquoHandler,
                                aquos:     this.toolbarAquosHandler,
                                'em-dash': this.toolbarEmDashHandler,
                                embed:     this.openEmbedModal,
                                html:      this.openHTMLModal,
                            }
                        },
                        keyboard: {
                            bindings: {
                                insertEmDash: {
                                    key: '1',
                                    shortKey: true,
                                    handler: this.toolbarEmDashHandler
                                },
                                insertLaquo: {
                                    key: '2',
                                    shortKey: true,
                                    handler: this.toolbarLaquoHandler
                                },
                                insertRaquo: {
                                    key: '3',
                                    shortKey: true,
                                    handler: this.toolbarRaquoHandler
                                },
                                insertAquos: {
                                    key: '4',
                                    shortKey: true,
                                    handler: this.toolbarAquosHandler
                                },
                                insertEmDash: {
                                    key: '-',
                                    shiftKey: true,
                                    handler: this.toolbarEmDashHandler
                                },
                            }
                        }
                    }}/>

                <ContentModal
                    isOpen={this.state.imageModalOpen}
                    onRequestClose={this.closeImageModal}
                    title="Выберите изображение"
                    contentLabel="Выберите изображение">
                    <ImageUploadForm onSubmit={this.submitImageHandler}/>
                </ContentModal>
                <ContentModal
                    isOpen={this.state.embedModalOpen}
                    onRequestClose={this.closeEmbedModal}
                    title="Вставьте url"
                    contentLabel="Вставьте url">
                    <AddEmbedForm onSubmit={this.submitEmbedHandler}/>
                </ContentModal>
                <ContentModal
                    isOpen={this.state.HTMLModalOpen}
                    onRequestClose={this.closeHTMLModal}
                    title="Вставьте html"
                    contentLabel="Вставьте html">
                    <AddHTMLForm onSubmit={this.submitHTMLHandler}/>
                </ContentModal>
                <ContentModal
                    isOpen={this.state.videoModalOpen}
                    onRequestClose={this.closeVideoModal}
                    title="Выберите видео"
                    contentLabel="Выберите видео">
                    <VideoUploadForm onSubmit={this.submitVideoHandler} />
                </ContentModal>
            </Root>
        )
    }
}

export default connect(null, { showPreloader, hidePreloader })(Rich)
