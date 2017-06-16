import React, { PureComponent } from 'react';

import TypedBtn from 'components/Button/TypedBtn';
import VideoUploadModal from './VideoUploadModal';

import {
    VideoStatus,
    Icon,
} from './style';

class VideoUpload extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
        };

        this.openModal = ::this.openModal;
        this.closeModal = ::this.closeModal;
        this.submitHandler = ::this.submitHandler;
    }

    openModal() {
        this.setState({
            modalOpen: true,
        });
    }

    closeModal() {
        this.setState({
            modalOpen: false,
        });
    }

    submitHandler(data) {
        const values = data.toJS();
        const {
            video,
            videoPreview,
        } = this.props;

        // Если загрузили новое видео, то обнуляем превью
        if (values.video && typeof values.video !== 'string') {
            video.id.input.onChange(null);
            video.file.input.onChange(values.video);

            videoPreview.id.input.onChange(null);
            videoPreview.file.input.onChange(null);
        }

        if (values.preview && typeof values.preview !== 'string') {
            videoPreview.id.input.onChange(null);
            videoPreview.file.input.onChange(values.preview);
            videoPreview.author.input.onChange(values.author);
            videoPreview.source.input.onChange(values.source);
        }

        if (values.url) {
            video.id.input.onChange(null);
            video.file.input.onChange(values.url);
        }

        this.closeModal();
    }

    render() {
        const { video, videoPreview, programs } = this.props;
        const initialValues = {
            video: video.file.input.value,
            preview: videoPreview.file.input.value,
            author: videoPreview.author.input.value,
            source: videoPreview.source.input.value,
            url: video.file.input.value
        };

        return (
            <div>
                {video && ((video.url && video.url.input.value) || (video.file && video.file.input.value))
                    ? (
                        <VideoStatus
                            onClick={this.openModal}
                            ready
                        >

                            <Icon type="text-video-lg" />
                            <strong>Статус видео:</strong>
                            <span>
                                Готово
                            </span>
                        </VideoStatus>
                    )
                    : (
                        <TypedBtn
                            block
                            onClick={this.openModal}
                            buttonType="upload"
                        >

                            Загрузить видео
                        </TypedBtn>
                    )
                }
                <VideoUploadModal
                    isOpen={this.state.modalOpen}
                    close={this.closeModal}
                    programs={programs}
                    onSubmit={this.submitHandler}
                    initialValues={initialValues}
                />
            </div>
        );
    }
}

export default VideoUpload;
