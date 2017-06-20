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
            program_id,
        } = this.props;

        // Если загрузили новое видео, то обнуляем превью
        if (values.video && typeof values.video !== 'string') {
            video.id.input.onChange(null);
            video.file.input.onChange(values.video);

            videoPreview.id.input.onChange(null);
            videoPreview.file.input.onChange(null);
        }
        else if (!values.video && values.url) {
            video.file.input.onChange(values.url);
        }

        if (values.preview && typeof values.preview !== 'string') {
            videoPreview.id.input.onChange(null);
            videoPreview.file.input.onChange(values.preview);
            videoPreview.author.input.onChange(values.author);
            videoPreview.source.input.onChange(values.source);
        }


        if (values.program_id) {
            program_id.input.onChange(values.program_id);
        }

        this.closeModal();
    }

    render() {
        const { video, videoPreview, program_id, programs } = this.props;
        const videoVal = video.file.input.value;
        const initialValues = {
            video: videoVal,
            preview: videoPreview.file.input.value,
            author: videoPreview.author.input.value,
            source: videoPreview.source.input.value,
            program_id: program_id.input.value,
            url: video.url.input.value || '',
        };

        if (!!videoVal && typeof videoVal === 'string') {
            initialValues.video = null;
            initialValues.url = videoVal;
        }

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
