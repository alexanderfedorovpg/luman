import React, { PureComponent } from 'react'
import styled from 'styled-components'
import ReactQuill, { Quill } from 'react-quill'
import Delta from 'quill-delta'

import ContentModal from 'components/Modal/ContentModal'
import ImageUploadForm from './Form'
import extendImageBlot from './imageBlot'

import * as api from 'api'

import 'quill/dist/quill.snow.css'

extendImageBlot(Quill)

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
`

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
        this.toolbarLaquoHandler = ::this.toolbarLaquoHandler
        this.toolbarRaquoHandler = ::this.toolbarRaquoHandler
        this.toolbarEmDashHandler = ::this.toolbarEmDashHandler
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

    insertText(text) {
        const editor = this.quill.getEditor()

        var range = editor.getSelection();
        if (range) {
            editor.insertText(range.index, text);
            editor.setSelection(range.index+1);
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
        const { quill } = this

        var range = quill.getSelection();
        if (range) {
            // +1 т.к. после вставки левой кавычки индекс
            // правой должен увеличиться на 1
            quill.insertText(range.index, '«');
            quill.insertText(range.index+range.length+1, '»');
            quill.setSelection(range.index+1, range.length);
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
                    isOpen={this.state.modalOpen}
                    onRequestClose={this.closeModal}
                    title="Выберите изображение"
                    contentLabel="Выберите изображение">

                    <ImageUploadForm onSubmit={this.submitHandler} />
                </ContentModal>
            </Root>
        )
    }
}

export default Rich
