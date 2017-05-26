import React, { PureComponent, PropTypes } from 'react';
import { fromJS } from 'immutable';
import styled from 'styled-components';
import { StickyContainer, Sticky } from 'react-sticky';

import { Wrap } from 'components/Content';
import User from 'components/User';
import Modal from 'components/Modal';
import Preview from 'containers/Preview';
import Chat from 'containers/Chat';

import {
    Part1,
    Part2,
    Part3,
    Part4,
    Part5,
} from './Form'
import {
    Root,
    Action,
    Time,
    Right,
    Left,
} from './style'

class Content extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.editorChangeHandler = ::this.editorChangeHandler;
    }

    getInitialData() {
        const props = this.props;
        const video = props.article.video_stream || {};

        return {
            top: props.article.top || null,
            rubrics: (props.article.rubrics || []).map((r) => r.id),
            video: {
                id: video.id,
                file: video.url,
            },
            videoPreview: {
                id: video.preview_id,
                file: video.preview,
            },
            body: props.article.body || '',
            title: props.article.title || '',
            subtitle: props.article.sub_title || '',
            theses: props.article.theses || '',
            keywords: (props.article.keywords || []).join(' ').trim(),

            image_main: (props.article.image_main||{}).url || '',
            image_main_title: (props.article.image_main||{}).object_name || '',
            image_main_author: (props.article.image_main||{}).object_author || '',
            image_main_source: (props.article.image_main||{}).object_source || '',

            image_preview: (props.article.image_preview||{}).url || '',
            image_preview_title: (props.article.image_preview||{}).object_name || '',
            image_preview_author: (props.article.image_preview||{}).object_author || '',
            image_preview_source: (props.article.image_preview||{}).object_source || '',

            editor: props.article.editor_id,
        }
    }

    editorChangeHandler(editor) {
        const { article, delegate } = this.props;

        if (article.id && editor.id) {
            delegate({
                id: article.id,
                new_editor_id: editor.id,
            });
        }
    }

    render() {
        let {
            article,
            rubrics,
            chatRoom,
            delegate,
            users,
            supervisor,
            preview,
            closePreview,
            onSubmit
        } = this.props;

        return (
            <Root>
                <header>
                    <Wrap>
                        <Left>
                            <Part1
                                onSubmit={onSubmit}
                                initialValues={this.getInitialData()} />
                        </Left>
                        <Right>
                            <Part2 />
                        </Right>
                    </Wrap>
                </header>
                <Action>
                    <Part3 rubrics={rubrics} />
                </Action>
                <Wrap>
                    <Left>
                        <Part4 />
                    </Left>
                    <Right>
                        {supervisor
                            ? <Part5 options={users} onChange={this.editorChangeHandler} />
                            : <Time><strong>Новость в работе:</strong></Time>
                        }
                        <StickyContainer>
                            <Sticky topOffset={220}>
                                {
                                    ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => (
                                            <Chat room={chatRoom} />
                                        )
                                }
                            </Sticky>
                        </StickyContainer>
                    </Right>
                </Wrap>
                <Modal
                    isOpen={preview}
                    contentLabel="Предпросмотр"
                    onRequestClose={closePreview}
                >

                    <Preview
                        data={{ ...this.state.data, id: article.id }}
                        onClose={closePreview}
                    />
                </Modal>
            </Root>
        );
    }
}

Content.propTypes = {
    article: PropTypes.object.isRequired,
    rubrics: PropTypes.array.isRequired,
    chatRoom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

export default Content;
