import React, { PureComponent } from 'react'
import styled from 'styled-components'
import ReactQuill, { Quill } from 'react-quill'
import Delta from 'quill-delta';
import { connect } from 'react-redux';

import ContentModal from 'components/Modal/ContentModal';
import ImageUploadForm from './ImageUploadForm';
import VideoUploadForm from './VideoUploadForm';
import addImageBlot from './imageBlot';
import addVideoBlot from './videoBlot';
import { showPreloader, hidePreloader } from 'containers/App/actions';

import * as api from 'api';

import 'quill/dist/quill.snow.css';

addImageBlot(Quill);
addVideoBlot(Quill);

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
            imageModalOpen: false,
            videoModalOpen: false
        }

    }

    openModal = (type) => {
        this.setState({
            [`${type}ModalOpen`]: true
        })
    }

    closeImageModal = () => {
        this.setState({
            imageModalOpen: false
        })
    }

    closeVideoModal = () => {
        this.setState({
            videoModalOpen: false
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

    toolbarLaquoHandler = (value) => {
        this.insertText('«')
    }

    toolbarRaquoHandler = (value) => {
        this.insertText('»')
    }

    toolbarEmDashHandler = (value) => {
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

    toolbarImageHandler = (value) => {
        this.openModal('image');
    }

    toolbarVideoHandler = (value) => {
        this.openModal('video');
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
                this.closeVideoModal()
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
                        <button className="ql-laquo" title="Ctrl + 2" />
                        <button className="ql-raquo" title="Ctrl + 3" />
                        <button className="ql-aquos" title="Ctrl + 4" />
                        <button className="ql-em-dash" title="Ctrl + 1" />
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
                                video: this.toolbarVideoHandler,
                                laquo: this.toolbarLaquoHandler,
                                raquo: this.toolbarRaquoHandler,
                                aquos: this.toolbarAquosHandler,
                                'em-dash': this.toolbarEmDashHandler,
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
                            }
                        }
                    }} />

                <ContentModal
                    isOpen={this.state.imageModalOpen}
                    onRequestClose={this.closeImageModal}
                    title="Выберите изображение"
                    contentLabel="Выберите изображение">

                    <ImageUploadForm onSubmit={this.submitImageHandler} />
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
