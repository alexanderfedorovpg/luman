import React, { PropTypes, PureComponent } from 'react'
import styled from 'styled-components'
import { FormattedTime } from 'react-intl'

import User, { Name as UserName } from 'components/User'
import Input from 'components/Form/Input'
import Icon from 'components/Icon'

import { font } from 'constants/style'

const Root = styled.div`
    width: 235px;
    height: 437px;
    padding-top: 15px;
    padding-right: 6px;
    padding-bottom: 7px;
    margin-top: 8px;

    padding-left: 16px;
    overflow-y: auto;

    border: 1px solid rgba(204, 204, 204, 0.74);
`

const Message = styled.div`
    margin-bottom: 11px;
`

const Time = styled.div`
    font-family: ${font.helvetica};
    font-size: 12px;
    font-weight: 300;
    color: #999;
    letter-spacing: 0.2px;
`

const Content = styled.div`
     margin-top: 1px;

    font-family: ${font.helvetica};
    font-size: 14px;
    font-weight: 400;
    color: #666;

    p {
        margin-top: 0;
        letter-spacing: 0.1px;
    }
`

const CustomUser = styled(User)`
    margin-right: 0;
    margin-bottom: 9px;
`

const CustomUserName = styled(UserName)`
    margin-top: 4px;
    letter-spacing: .1px;
    font-weight: 700;
    color: #333;
`

const Send = styled.form`
    margin-top: 19px;

    position: relative;

    font-family: ${font.helvetica};
    font-size: 14px;
    font-weight: 400;

    color: #999;
`

const CustomIcon = styled(Icon)`
    position: absolute;
    top: 9px;
    left: 7px;
`

const CustomInput = styled(Input)`
    padding-left: 33px;

    letter-spacing: -0.35px;
`

const Pic = styled.img`
    max-width: 100%;
    height: auto;
`

class Chat extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.queueUpdate = this.queueUpdate.bind(this)
    }

    componentDidMount() {
        this.queueUpdate()
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    queueUpdate() {
        let { loadMessages, room } = this.props

        if (room) loadMessages(room)

        // this.timeout = setTimeout(this.queueUpdate, 5000)
    }

    submitHandler(e) {
        e.preventDefault()

        if (this.state.message) {
            this.props.postMessage(this.props.room, {
                message: this.state.message,
                files: e.target.file.files
            })
            this.clearForm(e.target)
        }
    }

    clearForm(form) {
        this.setState({ message: '' })
        form.reset()
    }

    changeHandler(e) {
        this.setState({
            message: e.target.value.trim()
        })
    }

    renderMessages(messages) {
        return messages.map((item, i) => (
            <Message key={i}>
                {item.author
                    ? (
                        <CustomUser data={item.author}>
                            <CustomUserName href="#">
                                {item.author.name}
                            </CustomUserName>
                        </CustomUser>
                    )
                    : null
                }
                <Time>
                    <FormattedTime
                        value={`${item.created_at.date} ${item.created_at.timezone}`} />
                </Time>
                <Content>
                    <p>{item.message}</p>
                    {(item.files||[]).map(file => (
                        <div key={file.id}>
                            <Pic src={`//${file.url}`} />
                        </div>
                    ))}
                </Content>
            </Message>
        ))
    }

    render() {
        let { messages, loading } = this.props

        return (
            <div>
                <Root>
                    {messages.length
                        ? this.renderMessages(messages)
                        : loading
                            ? 'Загрузка...'
                            : 'Нет сообщений'
                    }
                </Root>
                <Send onSubmit={this.submitHandler}>
                    <label htmlFor="file">
                        <CustomIcon type="file" />
                    </label>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        multiple
                        style={{ display: 'none' }} />
                    <CustomInput
                        value={this.state.message}
                        onChange={this.changeHandler}
                        block />
                </Send>
            </div>
        )
    }
}

Chat.propTypes = {
    messages: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

export default Chat
