import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Markup from 'components/Chat'

import {
    loadChatMessages,
} from './actions'
import { postMessage } from 'containers/App/actions'

import {
    selectChat,
} from './selectors'

class Chat extends PureComponent {

    constructor(props) {
        super(props);

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

        this.timeout = setTimeout(this.queueUpdate, 5000)
    }

    render() {
        const { chat, loadMessages, postMessage, room } = this.props

        return (
            <Markup
                {...chat}
                room={room}
                loadMessages={loadMessages}
                onPost={postMessage} />
        )
    }
}

const mapStateToProps = state => ({
    chat: selectChat(state)
})

const mapDispatchToProps = dispatch => ({
    loadMessages(room) {
        dispatch(loadChatMessages(room))
    },
    postMessage(room, message) {
        dispatch(postMessage(room, message))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
