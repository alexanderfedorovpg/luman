import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import ReactQuill from 'react-quill'

import { Wrap, Left, Right } from 'components/Content'
import { Group, Textarea, Label } from 'components/Form'
import Input from 'components/Form/Input'
import Rich from 'components/Form/Rich'
import User from 'components/User'
import Icon from 'components/Icon'
import Rating from 'components/Rating'
import Tags from 'components/Tags'
import Modal from 'components/Modal'
import Preview from './Preview'
import Chat from './Chat'

import { ifProp } from 'utils/style'
import { font, padding, color } from 'constants/style'

import 'quill/dist/quill.snow.css'

const Root = styled.div`
    margin-top: 6px;
    padding-left: ${padding}
`

const CustomLeft = styled(Left)`
    border-right: 0;
`

const CustomRight = styled(Right)`
    flex-basis: auto;
    width: auto;
`

const VideoStatus = styled.div`
    font-family: ${font.opensans};
    font-size: 13px;
    color: #999999;
    font-weight: 600;
    letter-spacing: 0.1px;

    width: 235px;

    strong {
        color: #434242;
        font-weight: 700;

    }

    span {
        margin-left: 3px;
        color: ${color.danger}

        ${ifProp('ready')`
            color: #1f9d29;
        `}
    }
`

const CustomIcon = styled(Icon)`
    margin-top: -3px;
    margin-left: 2px;
    margin-right: 5px;
`

const Action = styled.div`
    align-items: center;
    margin-top: 21px;
    margin-bottom: -3px;
`

const CustomRating = styled(Rating)`
    margin-right: 20px;
    margin-bottom: 21px;
`

const TitleField = styled(Textarea)`
    height: 119px;
    padding-left: 16px;
    padding-right: 16px;

    font-family: ${font.opensans};
    font-weight: 400;
    color: #333333;
    font-size: 30px;
    line-height: 34px;
    letter-spacing: -0.7px;
`

const SubtitleField = styled(Textarea)`
    height: 96px;
    padding-left: 19px;
    padding-right: 19px;

    color: #666666;
    font-family: ${font.opensans};
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0;
`

const ThesesField = styled(SubtitleField)`
    font-size: 16px;
    font-weight: 400;

    resize: vertical;
`

const Time = styled.div`
    margin-top: 10px;
    margin-bottom: 25px;
    font-size: 13px;
`

class Content extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.propsToData(props)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.article !== nextProps.article) {
            this.setState({
                data: this.propsToData(nextProps)
            })
        }
    }

    propsToData(props) {
        return {
            top: props.article.Top || null,
            rubrics: (props.article.Rubrics||[]).map(r => r.name),
            stream: props.article.VideoStream || '',
            body: props.article.Body || '',
            title: props.article.Title || '',
            subtitle: props.article.Subtitle || '',
            theses: props.article.Note || '',
            keywords: (props.article.Keywords || []).join(' ').trim(),
        }
    }

    symbolsLeft(string, max) {
        return `осталось ${max - string.length} символов`
    }

    changeHandlerTarget(prop) {
        return e => {
            if (this.state.data[prop] !== e.target.value) {
                this.setState({
                    data: {
                        ...this.state.data,
                        [prop]: e.target.value
                    }
                })
            }
        }
    }

    changeHandlerValue(prop) {
        return (value) => {
            if (this.state.data[prop] !== value) {
                this.setState({
                    data: {
                        ...this.state.data,
                        [prop]: value
                    }
                })
            }
        }
    }

    render() {
        let {
            chat,
            article,
            rubrics,
            postMessage,
            loadMessages,
            getUserById,
            chatRoom,
            editor,
            preview,
            closePreview
        } = this.props

        return (
            <Root>
                <header>
                    <Wrap>
                        <CustomLeft>
                            <Input
                                value={this.state.data.stream}
                                onChange={this.changeHandlerTarget('stream')}
                                block />
                        </CustomLeft>
                        <CustomRight>
                            <VideoStatus ready={article.ExistVideo}>
                                <CustomIcon type="text-video-lg" />
                                <strong>Статус видео:</strong>
                                <span>
                                    { article.ExistVideo ? 'готово' : 'не готово' }
                                </span>
                            </VideoStatus>
                        </CustomRight>
                    </Wrap>
                </header>
                <Action>
                    <Wrap>
                        <CustomRating
                            value={this.state.data.top}
                            onChange={this.changeHandlerValue('top')} />
                        <Tags
                            data={rubrics.map(r => r.name)}
                            value={this.state.data.rubrics}
                            onChange={this.changeHandlerValue('rubrics')} />
                    </Wrap>
                </Action>
                <Wrap>
                    <CustomLeft>
                        <Group>
                            <Label right light>
                                <span>Заголовок</span> : {this.symbolsLeft(this.state.data.title, 100)}
                            </Label>
                            <TitleField
                                value={this.state.data.title}
                                onChange={this.changeHandlerTarget('title')}
                                block />
                        </Group>
                        <Group>
                            <Label right light>
                                <span>Подзаголовок</span> : {this.symbolsLeft(this.state.data.subtitle, 100)}
                            </Label>
                            <SubtitleField
                                value={this.state.data.subtitle}
                                onChange={this.changeHandlerTarget('subtitle')}
                                block />
                        </Group>
                        <Group>
                            <Label right light>
                                <span>Тезисы через //</span> : {this.symbolsLeft(this.state.data.theses, 100)}
                            </Label>
                            <ThesesField
                                value={this.state.data.theses}
                                onChange={this.changeHandlerTarget('theses')}
                                block />
                        </Group>
                        <Group>
                            <ReactQuill value={this.state.data.body}
                                onChange={this.changeHandlerValue('body')} />
                        </Group>
                        <Group>
                            <Label right light>
                                Не более 4 слов через пробел
                            </Label>
                            <Input
                                value={this.state.data.keywords}
                                onChange={this.changeHandlerTarget('keywords')}
                                placeholder="Ключевые слова"
                                block />
                        </Group>
                    </CustomLeft>
                    <CustomRight>
                        {editor
                            ? <User data={editor} />
                            : <Time><strong>Новость в работе:</strong></Time>
                        }
                        <Chat
                            {...chat}
                            postMessage={postMessage}
                            loadMessages={loadMessages}
                            room={chatRoom} />
                    </CustomRight>
                </Wrap>
                <Modal
                    isOpen={preview}
                    contentLabel="Предпросмотр"
                    onRequestClose={closePreview}>

                    <Preview
                        data={this.state.data}
                        onClose={closePreview} />
                </Modal>
            </Root>
        )
    }
}

Content.propTypes = {
    chat: PropTypes.shape({
        messages: PropTypes.array,
        loading: PropTypes.bool
    }).isRequired,
    article: PropTypes.object.isRequired,
    postMessage: PropTypes.func.isRequired,
    loadMessages: PropTypes.func.isRequired,
    rubrics: PropTypes.array.isRequired,
    chatRoom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

export default Content
