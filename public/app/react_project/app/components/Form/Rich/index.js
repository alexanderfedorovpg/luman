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

import extendImageBlot from './blots/imageBlot'
import extendTwitterBlot from './blots/TwitterBlot'
import extendInstagramBlot from './blots/InstagramBlot'
import extendFacebookBlot from './blots/FacebookBlot'
import extendHtmlBlot from './blots/HtmlBlot'
import extendVideoBlot from './blots/videoBlot'
/**
 * некий валидатор, который использует редактор, чтобы распознать html,
 * который в него закинули и применить к нему особые инструкции
 */
extendImageBlot(Quill);
extendTwitterBlot(Quill);
extendInstagramBlot(Quill);
extendFacebookBlot(Quill);
extendHtmlBlot(Quill);
extendVideoBlot(Quill);

const Root = styled.div`
    .ql-laquo:after {
        content: "«";
    }

    .ql-raquo:after {
        content: "»";
    }

    .ql-aquos:after {
        content: "«»";
    }

    .ql-em-dash:after {
        content: "—";
    }
    
    .ql-embed:after {
        content: "embed";
    }
    .ql-html {
        margin-left:50px;
    }
    .ql-html:after {
        content: "html";
    }

    .ql-toolbar.ql-toolbar {
        border-bottom: none;
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

    uploadFile(f, data, cb) {
        this.props.showPreloader();
        api.uploadFile(
            f,
            {
                object_name: data.title,
                object_author: data.author,
                object_source: data.source
            }
        ).then(({ data: { file } }) => {
            cb(file.url);
            this.props.hidePreloader();
        })
    }

    addImage(data, cb) {
        if (data.image != null && data.image[0] != null) {
            this.uploadFile(data.image[0], data, (result) => {
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
        if (data.video != null && data.video[0] != null) {
            this.uploadFile(data.video[0], data, (result) => {
                let editor = this.quill.getEditor();
                let range = editor.getSelection(true);
                editor.updateContents(
                    new Delta()
                        .retain(range.index)
                        .delete(range.length)
                        .insert({ 'ext-video': { src: result, ...data }}),
                    'user'
                );

                cb();
            });
        }
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
                        <button className="ql-laquo" title="Ctrl + 2" />
                        <button className="ql-raquo" title="Ctrl + 3" />
                        <button className="ql-aquos" title="Ctrl + 4" />
                        <button className="ql-em-dash" title="Ctrl + 1" />
                    </div>
                    <div className="ql-formats">
                        <button className="ql-embed"/>
                        <button className="ql-html"/>
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
