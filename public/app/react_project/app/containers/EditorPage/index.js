import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import HeaderEditor from 'components/Editor/Header.editor'
import HeaderSupervisor from 'components/Editor/Header.supervisor'
import Content from 'components/Editor/Content'

import { loadChatMessages, postMessage, loadArticle } from './actions'

import { loadEditors } from 'containers/App/actions'

import {
    selectChat,
    selectArticle
} from './selectors'
import { selectRubrics } from 'containers/App/selectors'

import {
    selectUsersMap,
    selectCurrentUser,
    selectMenuExpandedStatus
} from 'containers/App/selectors'

import { checkPermissons } from 'utils/permissons'

class EditorPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            preview: false
        }

        this.openPreview = this.openPreview.bind(this)
        this.closePreview = this.closePreview.bind(this)
    }

    componentDidMount() {
        this.props.loadArticle(this.props.params.id)
    }

    openPreview() {
        if (this.state.preview) return

        this.setState({
            preview: true
        })
    }

    closePreview() {
        if (!this.state.preview) return

        this.setState({
            preview: false
        })
    }

    renderContent() {
        let {
            menuOpen,
            chat,
            article,
            rubrics,
            loadMessages,
            postMessage,
            params,
            usersMap,
            user
        } = this.props

        if (checkPermissons(user, ['admin', 'сommissioning-editor'])) {
            return (
                <div>
                    <HeaderSupervisor
                        moved={menuOpen}
                        preview={this.openPreview} />
                    <Content
                        chat={chat}
                        article={article}
                        rubrics={rubrics}
                        chatRoom={params.id}
                        preview={this.state.preview}
                        closePreview={this.closePreview}
                        editor={usersMap[article.EditorId]}
                        loadMessages={loadMessages}
                        postMessage={postMessage} />
                </div>
            )
        }
        else if (checkPermissons(user, ['editor'])) {
            return (
                <div>
                    <HeaderEditor
                        moved={menuOpen}
                        preview={this.openPreview} />
                    <Content
                        chat={chat}
                        article={article}
                        rubrics={rubrics}
                        chatRoom={params.id}
                        preview={this.state.preview}
                        closePreview={this.closePreview}
                        loadMessages={loadMessages}
                        postMessage={postMessage} />
                </div>
            )
        }
        else {
            return null
        }
    }

    render() {

        return (
            <div>
                <Helmet
                    title="Правки" />

                {this.renderContent()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    chat: selectChat(state),
    article: selectArticle(state),
    rubrics: selectRubrics(state),
    usersMap: selectUsersMap(state),
    user: selectCurrentUser(state),
    menuOpen: selectMenuExpandedStatus(state)
})

const mapDispatchToProps = dispatch => ({
    loadMessages(room) {
        dispatch(loadChatMessages(room))
    },
    loadArticle(id) {
        dispatch(loadArticle(id))
    },
    postMessage(room, message) {
        dispatch(postMessage(room, message))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage)
