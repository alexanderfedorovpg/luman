import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import HeaderEditor from 'components/Editor/Header.editor'
import HeaderSupervisor from 'components/Editor/Header.supervisor'
import Content from 'components/Editor/Content'

import {
    loadChatMessages,
    postMessage,
    loadArticle,
    deleteArticle,
    finishArticle,
    publishArticle,
    delegateArticle
} from './actions'

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
            deleteArticle,
            delegateArticle,
            finishArticle,
            publishArticle,
            params,
            usersMap,
            user
        } = this.props

        const headerProps = {
            moved: menuOpen,
            del: deleteArticle.bind(this, article.id),
            preview: this.openPreview
        }

        if (!article.id) return null

        if (checkPermissons(user, ['admin', 'сommissioning-editor'])) {
            return (
                <Content
                    chat={chat}
                    article={article}
                    rubrics={rubrics}
                    chatRoom={params.id}
                    preview={this.state.preview}
                    publish={publishArticle}
                    closePreview={this.closePreview}
                    editor={usersMap[article.EditorId]}
                    loadMessages={loadMessages}
                    postMessage={postMessage}>

                    <HeaderSupervisor
                        {...headerProps}
                        publish={() => publishArticle(this.props.article)} />
                </Content>
            )
        }
        else if (checkPermissons(user, ['editor'])) {
            return (
                <Content
                    chat={chat}
                    article={article}
                    rubrics={rubrics}
                    chatRoom={params.id}
                    delegate={delegateArticle.bind(this, article.id)}
                    preview={this.state.preview}
                    finish={finishArticle}
                    closePreview={this.closePreview}
                    loadMessages={loadMessages}
                    postMessage={postMessage}>

                    <HeaderEditor
                        delegate={delegateArticle.bind(this, article.id)}
                        finish={finishArticle}
                        {...headerProps} />
                </Content>
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
    finishArticle(data) {
        if (data) {
            dispatch(finishArticle(data))
        }
    },
    publishArticle(data) {
        if (data) {
            dispatch(publishArticle(data))
        }
    },
    deleteArticle(id) {
        dispatch(deleteArticle(id))
    },
    delegateArticle(id) {
        dispatch(delegateArticle(id))
    },
    postMessage(room, message) {
        dispatch(postMessage(room, message))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage)
