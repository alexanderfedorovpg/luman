import React, {PureComponent} from 'react'
import styled from 'styled-components'
import ReactQuill, {Quill} from 'react-quill'
import Delta from 'quill-delta'

import {isUrl} from 'utils/uri'
import ContentModal from 'components/Modal/ContentModal'

import * as api from 'api'
import 'quill/dist/quill.snow.css'

import ImageUploadForm from './forms/ImageUploadForm'
import AddEmbedForm from './forms/AddEmbedForm'
import AddHTMLForm from './forms/AddHTMLForm'

import addEmbed from './widgets/AddEmbed'

import extendImageBlot from './blots/imageBlot'
import extendTwitterBlot from './blots/TwitterBlot'
import extendInstagramBlot from './blots/InstagramBlot'
import extendFacebookBlot from './blots/FacebookBlot'
import extendHtmlBlot from './blots/HtmlBlot'
/**
 * некий валидатор, который использует редактор, чтобы распознать html,
 * который в него закинули и применить к нему особые инструкции
 */
extendImageBlot(Quill);
extendTwitterBlot(Quill);
extendInstagramBlot(Quill);
extendFacebookBlot(Quill);
extendHtmlBlot(Quill);

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
`

class Rich extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            modalImageOpen: false,
            modalAddHTML: false,
            modalAddEmbed:  false
        }

        this.openImageModal = ::this.openImageModal
        this.closeImageModal = ::this.closeImageModal
        this.submitHandlerImage = ::this.submitHandlerImage
        this.toolbarImageHandler = ::this.toolbarImageHandler
        this.toolbarLaquoHandler = ::this.toolbarLaquoHandler
        this.toolbarRaquoHandler = ::this.toolbarRaquoHandler
        this.toolbarEmDashHandler = ::this.toolbarEmDashHandler

    }

    openImageModal() {
        this.setState({
            ...this.state,
            modalImageOpen: true
        })
    }

    insertText(text) {
        const editor = this.quill.getEditor()

        var range = editor.getSelection();
        if (range) {
            editor.insertText(range.index, text);
            editor.setSelection(range.index + 1);
        }
    }

    toolbarLaquoHandler(value) {
        this.insertText('«')
    }

    toolbarRaquoHandler(value) {
        this.insertText('»')
    }

    toolbarEmDashHandler(value) {
        this.insertText('—')
    }

    // у этой функции quill'овский контекст,
    // т.е. this == quill instance
    toolbarAquosHandler(value) {
        const {quill} = this

        var range = quill.getSelection();
        if (range) {
            // +1 т.к. после вставки левой кавычки индекс
            // правой должен увеличиться на 1
            quill.insertText(range.index, '«');
            quill.insertText(range.index + range.length + 1, '»');
            quill.setSelection(range.index + 1, range.length);
        }
    }

    closeImageModal() {
        this.setState({
            ...this.state,
            modalImageOpen: false
        })
    }

    toolbarImageHandler() {
        this.openImageModal();
    }


    uploadImage(image, data, cb) {
        api.uploadFile(
            image,
            {
                object_name:   data.title,
                object_author: data.author,
                object_source: data.source
            }
        ).then(({data: {file}}) => cb(file.url))
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
                        .insert({image: {src: result, ...data}}),
                    'user'
                );
                cb();
            });
        }
    }

    submitHandlerImage(data) {
        const values = data.toJS()
        this.addImage(
            values,
            () => {
                this.closeImageModal()
            }
        )
    }

    openAddEmbedModal = () => this.setState({ ...this.state, modalAddEmbed: true})
    closeAddEmbedModal = () => this.setState({ ...this.state, modalAddEmbed: false})

    openAddHTMLModal = () => this.setState({ ...this.state, modalAddHTML: true})
    closeAddHTMLModal = () => this.setState({ ...this.state, modalAddHTML: false})

    /**
     * вызовется при добавлении юрл
     * @param data
     */
    submitHandlerAddEmbedModal = (data) => {
        let quill = this.quill.getEditor();
        let range = quill.getSelection(true).index;
        let url = data.toJS().url;
        addEmbed(quill, url, range, this.closeAddEmbedModal);
    }

    /**
     * вызовется при добавлении html
     * @param data
     */
    submitHandlerAddHTMLModal = (data) => {
        data = data.toJS();
        let quill = this.quill.getEditor();
        let range = quill.getSelection(true).index;
        quill.updateContents(
            new Delta()
                .retain(range)
                .insert({html: data.html}),
            'api'
        );
        this.closeAddHTMLModal();
    }

    render() {
        return (
            <Root>
                <div id="fb-root"></div>
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
                        <button className="ql-laquo"/>
                        <button className="ql-raquo"/>
                        <button className="ql-aquos" title="Ctrl + Shift + 2"/>
                        <button className="ql-em-dash"/>
                    </div>
                    <div className="ql-formats">
                        <button className="ql-embed"/>
                        <button className="ql-html"/>
                    </div>
                </div>
                <ReactQuill
                    ref={(el) => {
                        this.quill = el
                    }}
                    {...this.props}
                    modules={{
                        toolbar:  {
                            container: '#toolbar',
                            handlers:  {
                                image:     this.toolbarImageHandler,
                                laquo:     this.toolbarLaquoHandler,
                                raquo:     this.toolbarRaquoHandler,
                                aquos:     this.toolbarAquosHandler,
                                'em-dash': this.toolbarEmDashHandler,
                                embed:     this.openAddEmbedModal,
                                html:     this.openAddHTMLModal,
                            }
                        },
                        keyboard: {
                            bindings: {
                                insertAquos:  {
                                    key:      '2',
                                    shiftKey: true,
                                    shortKey: true,
                                    handler:  this.toolbarAquosHandler
                                },
                                insertEmDash: {
                                    key:      '-',
                                    shiftKey: true,
                                    handler:  this.toolbarEmDashHandler
                                },
                            }
                        }
                    }}/>

                <ContentModal
                    isOpen={this.state.modalImageOpen}
                    onRequestClose={this.closeImageModal}
                    title="Выберите изображение"
                    contentLabel="Выберите изображение">
                    <ImageUploadForm onSubmit={this.submitHandlerImage}/>
                </ContentModal>
                <ContentModal
                    isOpen={this.state.modalAddEmbed}
                    onRequestClose={this.closeAddEmbedModal}
                    title="Вставьте url"
                    contentLabel="Вставьте url">
                    <AddEmbedForm onSubmit={this.submitHandlerAddEmbedModal}/>
                </ContentModal>
                <ContentModal
                    isOpen={this.state.modalAddHTML}
                    onRequestClose={this.closeAddHTMLModal}
                    title="Вставьте html"
                    contentLabel="Вставьте html">
                    <AddHTMLForm onSubmit={this.submitHandlerAddHTMLModal}/>
                </ContentModal>
            </Root>
        )
    }
}

export default Rich
