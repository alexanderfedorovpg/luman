import React, {PureComponent, PropTypes, Component} from 'react';
import {fromJS} from 'immutable';
import styled from 'styled-components';
import {StickyContainer, Sticky} from 'react-sticky';

import {Wrap} from 'components/Content';
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

        this.editorChangeHandler = ::this.editorChangeHandler;
    }

    /**
     * данные для заполнения формы при инициализации
     * @returns {{top: null, rubrics, video: {id: *, file: (string|*)}, videoPreview: {id: *, file: (*|string)}, body: string, title: string, subtitle: string, theses: string, keywords: string, image_main: string, image_main_title: string, image_main_author: string, image_main_source: string, image_preview: string, image_preview_title: string, image_preview_author: string, image_preview_source: string, editor: (*|number|Array|_editor2.default|null|editor_id)}}
     */
    getInitialData() {
        const props = this.props;
        const video = props.article.video_stream || {};

        return {
            top:          props.article.top || null,
            rubrics:      (props.article.rubrics || []).map((r) => r.id),
            video:        {
                id:   video.id,
                file: video.url,
            },
            videoPreview: {
                id:   video.preview_id,
                file: video.preview,
            },
            body:         props.article.body || '',
            title:        props.article.title || '',
            subtitle:     props.article.sub_title || '',
            theses:       props.article.theses || '',
            keywords:     (props.article.keywords || []).join(' ').trim(),

            image_main:        (props.article.image_main || {}).url || '',
            image_main_title:  (props.article.image_main || {}).object_name || '',
            image_main_author: (props.article.image_main || {}).object_author || '',
            image_main_source: (props.article.image_main || {}).object_source || '',

            image_preview:        (props.article.image_preview || {}).url || '',
            image_preview_title:  (props.article.image_preview || {}).object_name || '',
            image_preview_author: (props.article.image_preview || {}).object_author || '',
            image_preview_source: (props.article.image_preview || {}).object_source || '',

            editor: this.props.users.find(v => v.id === props.article.editor_id),
        }
    }

    /**
     * данные для заполнения предпросмотра
     * @returns {*}
     */
    getObjectForm() {
        const {article, formValues, rubrics} = this.props;
        if (formValues) {
            const values = this.props.formValues.toJS()
            let obj = {
                id:            article.id,
                rubrics:       (values.rubrics || []).map((num) => {
                    let name;
                    rubrics.forEach((item) => {
                        if (item.id == num) {
                            name = item.name;
                        }
                    })
                    return {name: name};
                }),
                publish_date:  article.created_at,
                title:         values.title,
                theses:        values.theses ? values.theses.split('//') : [],
                top:           values.top,
                editor_id:     (values.editor || null),
                sub_title:     values.subtitle,
                body:          values.body,
                keywords:      values.keywords.trim().replace(/ +/g, ','),
                video_stream:  {
                    id:       values.video.id,
                    url:      typeof values.video.file === 'string' || !values.video.file ? (values.video.file || '') : values.video.file[0],
                    duration: null,
                    preview:   typeof values.videoPreview.file === 'string' || !values.videoPreview.file ? (values.videoPreview.file || '') : values.videoPreview.file[0],
                },
                image_main:    {
                    url:           typeof values.image_main === 'string' || !values.image_main ? (values.image_main || '') : values.image_main[0],
                    object_name:   values.image_main_title,
                    object_author: values.image_main_author,
                    object_source: values.image_main_source,
                },
                image_preview: {
                    url:           typeof values.image_preview === 'string' || !values.image_preview[0] ? (values.image_preview || '') : values.image_preview[0],
                    object_name:   values.image_preview_title,
                    object_author: values.image_preview_author,
                    object_source: values.image_preview_source,
                },
            }
            return obj
        } else {
            return article;
        }
    }

    editorChangeHandler(editor) {
        const {article, delegate} = this.props;

        if (article.id && editor.id) {
            delegate({
                id:            article.id,
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
            onChange,
            onSubmit
        } = this.props;
        return (
            <Root>
                <header>
                    <Wrap>
                        <Left>
                            <Part1
                                onSubmit={onSubmit}
                                initialValues={this.getInitialData()}/>
                        </Left>
                        <Right>
                            <Part2 />
                        </Right>
                    </Wrap>
                </header>
                <Action>
                    <Part3 rubrics={rubrics}/>
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
                        data={{...this.getObjectForm(), id: article.id}}
                        onClose={closePreview}
                    />
                </Modal>
            </Root>
        );
    }
}

Content.propTypes = {
    article:  PropTypes.object.isRequired,
    rubrics:  PropTypes.array.isRequired,
    chatRoom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

export default Content;
