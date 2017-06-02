import React, { PureComponent } from 'react'
import styled from 'styled-components'
import ReactQuill, { Quill } from 'react-quill'
import Delta from 'quill-delta'

import ContentModal from 'components/Modal/ContentModal'
import ImageUploadForm from './Form'
import extendImageBlot from './imageBlot'
import extendHtmlBlot from './htmlBlot'
import FormAddHtml from './FormAddHtml'
import TweetEmbed from 'react-tweet-embed'

import * as api from 'api'

import 'quill/dist/quill.snow.css'

/**
 * некий валидатор, который использует редактор, чтобы распознать html,
 * который в него закинули и применить к нему особые инструкции
 */
extendImageBlot(Quill);
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
    
    .ql-html:after {
        content: "html";
    }
`

class Rich extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            modalImageOpen: false,
            modalHtmlOpen:  false
        }

        this.openImageModal = ::this.openImageModal
        this.closeImageModal = ::this.closeImageModal

        this.openAddHtmlModal = ::this.openAddHtmlModal
        this.closeAddHtmlModal = ::this.closeAddHtmlModal

        this.submitHandlerImage = ::this.submitHandlerImage
        this.submitHandlerHtml = ::this.submitHandlerHtml

        this.toolbarImageHandler = ::this.toolbarImageHandler
        this.toolbarLaquoHandler = ::this.toolbarLaquoHandler
        this.toolbarRaquoHandler = ::this.toolbarRaquoHandler
        this.toolbarEmDashHandler = ::this.toolbarEmDashHandler
        this.toolbarAddHtmlHandler = ::this.toolbarAddHtmlHandler

        this.customMatcherFigure = ::this.customMatcherFigure
    }

    openImageModal() {
        this.setState({
            ...this.state,
            modalImageOpen: true
        })
    }

    openAddHtmlModal() {
        this.setState({
            ...this.state,
            modalHtmlOpen: true
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

    closeAddHtmlModal() {
        this.setState({
            ...this.state,
            modalHtmlOpen: false
        })
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

    toolbarAddHtmlHandler() {
        this.openAddHtmlModal();
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
    submitHandlerHtml(data) {
        const values = data.toJS()
        this.addHtml(
            values,
            () => {
                this.closeImageModal()
            }
        )
    }
    addHtml(data, cb) {
        console.log('addHtml', data);
        let html = data.html;
        let editor = this.quill.getEditor();
        let range = editor.getSelection(true);
        editor.updateContents(
            new Delta()
                .retain(range.index)
                .delete(range.length)
                .insert({html: html}),
            'user'
        );
        //editor.clipboard.dangerouslyPasteHTML(range.index, html)
        cb();
    }
    customMatcherFigure(data,value,value2){
        console.log('data',data);
        console.log('value',value);
        this.quill.insertEmbed(10, 'html', 'http://quilljs.com/images/cloud.png');
        //return value;
    }
    render() {
        return (
            <Root>
                <div id="toolbar">
                    <div className="ql-formats">
                        <select className="ql-header">
                            <option value="1" />
                            <option value="2" />
                            <option value="3" />
                            <option value="4" />
                            <option value="5" />
                            <option value="6" />
                            <option />
                        </select>
                        <button className="ql-bold" />
                        <button className="ql-italic" />
                        <button className="ql-underline" />
                        <button className="ql-link" />
                    </div>
                    <div className="ql-formats">
                        <button className="ql-list" value="ordered" />
                        <button className="ql-list" value="bullet" />
                    </div>
                    <div className="ql-formats">
                        <button className="ql-image" />
                        <button className="ql-video" />
                    </div>
                    <div className="ql-formats">
                        <button className="ql-code-block" />
                        <button className="ql-blockquote" />
                    </div>
                    <div className="ql-formats">
                        <button className="ql-clean" />
                    </div>
                    <div className="ql-formats">
                        <button className="ql-laquo" />
                        <button className="ql-raquo" />
                        <button className="ql-aquos" title="Ctrl + Shift + 2" />
                        <button className="ql-em-dash" />
                    </div>
                    <div className="ql-formats">
                        <button className="ql-html" />
                    </div>
                </div>
                <ReactQuill
                    ref={(el) => { this.quill = el }}
                    {...this.props}
                    modules={{
                        toolbar: {
                            container: '#toolbar',
                            handlers: {
                                image: this.toolbarImageHandler,
                                laquo: this.toolbarLaquoHandler,
                                raquo: this.toolbarRaquoHandler,
                                aquos: this.toolbarAquosHandler,
                                'em-dash': this.toolbarEmDashHandler,
                                html:      this.toolbarAddHtmlHandler,
                            }
                        },
                        keyboard: {
                            bindings: {
                                insertAquos: {
                                    key: '2',
                                    shiftKey: true,
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
                    }} />

                <ContentModal
                    isOpen={this.state.modalImageOpen}
                    onRequestClose={this.closeImageModal}
                    title="Выберите изображение"
                    contentLabel="Выберите изображение">
                    <ImageUploadForm onSubmit={this.submitHandlerImage}/>
                </ContentModal>
                <ContentModal
                    isOpen={this.state.modalHtmlOpen}
                    onRequestClose={this.closeAddHtmlModal}
                    title="Добавить html"
                    contentLabel="Добавьте html">
                    <FormAddHtml onSubmit={this.submitHandlerHtml}/>
                </ContentModal>
            </Root>
        )
    }
}

export default Rich
