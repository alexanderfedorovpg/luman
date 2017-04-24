import React, { Component, PropTypes, Children, cloneElement } from 'react'
import styled from 'styled-components'
import ReactQuill from 'react-quill'
import Dropzone from 'react-dropzone'

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
import HeaderEditor from './Header.editor'
import HeaderSupervisor from './Header.supervisor'

import { ifProp } from 'utils/style'
import { font, padding, color } from 'constants/style'

import 'quill/dist/quill.snow.css'

const titleMax = 120
const subtitleMax = 140

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

const ImageContainer = styled.div`
    margin-right: 20px;
    margin-bottom: 7px;
    float: left;

    box-sizing: content-box;
    border: 1px solid rgba(204,204,204,.74);
    max-width: 50%;

    img {
        width: 100%;
        height: auto
    }
`

const StyledDropzone = styled(({ filled, ...rest }) => <Dropzone {...rest} />)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    min-height: 243px;
    border: 2px dashed rgb(102, 102, 102);
    border-radius: 5px;

    ${ifProp('filled')`
        border: 0;
    `}
`

class Content extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.propsToData(props)
        };

        this.changeHandlerTarget = this.changeHandlerTarget.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.article.id !== nextProps.article.id) {
            this.setState({
                data: this.propsToData(nextProps)
            })
        }
    }

    propsToData(props) {
        return {
            top: props.article.top || null,
            rubrics: (props.article.rubrics||[]).map(r => r.name),
            stream: props.article.video_stream || '',
            body: props.article.body || '',
            title: props.article.title || '',
            subtitle: props.article.sub_title || '',
            theses: props.article.theses || '',
            keywords: (props.article.keywords || []).join(' ').trim(),
            image_main: props.article.image_main || '',
            image_preview: props.article.image_preview || '',
        }
    }

    symbolsLeft(string, max) {
        return `осталось ${max - string.length} символов`
    }

    dataToSubmit() {
        let { data } = this.state
        let { article, rubrics } = this.props

        let r = data.rubrics.map(name => (
            rubrics.find(r=>r.name==name).id
        ))[0]

        if (!r) return;

        return {
            id: article.id,
            top: data.top,
            title: data.title.slice(0, titleMax),
            sub_title: data.subtitle.slice(0, subtitleMax),
            editor_id: article.editor.id,
            rubrics_id: r,
            keywords: data.keywords.split(' '),
            tags: article.tags,
            theses: data.theses,
            image_main: data.image_main_temp || article.image_main_id,
            image_preview: data.image_preview_temp || article.image_preview_id,
            body: data.body,
            video_stream: data.stream
        }
    }

    onDrop(prop) {
        return acceptedFiles => {
            if (acceptedFiles[0]) {
                let reader  = new FileReader()

                reader.onload = () => {

                    this.setState({
                        data: {
                            ...this.state.data,
                            [prop]: reader.result,
                            [`${prop}_temp`]: acceptedFiles[0]
                        }
                    })
                }

                reader.readAsDataURL(acceptedFiles[0])

            }
        }
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
            delegate,
            editor,
            preview,
            finish,
            closePreview
        } = this.props

        return (
            <Root>
                {Children.map(this.props.children, child => {
                    if (child.type == HeaderEditor || child.type == HeaderSupervisor) {
                        return cloneElement(child, { getFormData: this.dataToSubmit.bind(this) })
                    }
                    else {
                        return child
                    }
                })}
                <header>
                    <Wrap>
                        <CustomLeft>
                            <Input
                                value={this.state.data.stream}
                                onChange={this.changeHandlerTarget('stream')}
                                block />
                        </CustomLeft>
                        <CustomRight>
                            <VideoStatus ready={article.video_stream}>
                                <CustomIcon type="text-video-lg" />
                                <strong>Статус видео:</strong>
                                <span>
                                    { article.video_stream ? 'готово' : 'не готово' }
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
                            type="radio"
                            onChange={this.changeHandlerValue('rubrics')} />
                    </Wrap>
                </Action>
                <Wrap>
                    <CustomLeft>
                        <Group>
                            <Label right light>
                                <span>Заголовок</span> : {this.symbolsLeft(this.state.data.title, titleMax)}
                            </Label>
                            <TitleField
                                value={this.state.data.title}
                                onChange={this.changeHandlerTarget('title')}
                                block />
                        </Group>
                        <Group>
                            <Label right light>
                                <span>Подзаголовок</span> : {this.symbolsLeft(this.state.data.subtitle, subtitleMax)}
                            </Label>
                            <SubtitleField
                                value={this.state.data.subtitle}
                                onChange={this.changeHandlerTarget('subtitle')}
                                block />
                        </Group>
                        <Group>
                            <Label right light>
                                <span>Тезисы через //</span>
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
                            <ImageContainer>
                                <StyledDropzone
                                    onDrop={this.onDrop('image_main')}
                                    multiple={false}
                                    filled={!!this.state.data.image_main}
                                    title="Нажмите чтобы выбрать другое изображение">

                                    {this.state.data.image_main
                                        ? <img src={urlHelper(this.state.data.image_main)} />
                                        : (
                                            <span>
                                                Переместите изображение<br />
                                                либо<br />
                                                кликните для выбора изображения
                                            </span>
                                        )}
                                </StyledDropzone>
                            </ImageContainer>
                            <StyledDropzone
                                onDrop={this.onDrop('image_preview')}
                                multiple={false}
                                filled={!!this.state.data.image_preview}
                                title="Нажмите чтобы выбрать другое изображение">

                                {this.state.data.image_preview
                                    ? <img src={urlHelper(this.state.data.image_preview)} />
                                    : (
                                        <span>
                                            Переместите изображение<br />
                                            либо<br />
                                            кликните для выбора изображения
                                        </span>
                                    )}
                            </StyledDropzone>
                            <div style={{ clear: 'both' }} />
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
                        onClose={closePreview}
                        delegate={delegate}
                        done={()=>finish(this.dataToSubmit())} />
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

// если url не base64 - префиксит его с "//" чтобы он был абсолютным
function urlHelper(url) {
    return url.trim().search(/^data:/) > -1
        ? url
        : `//${url}`
}
