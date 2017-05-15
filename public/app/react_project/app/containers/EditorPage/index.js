import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import HeaderEditor from 'components/Editor/Header.editor'
import HeaderSupervisor from 'components/Editor/Header.supervisor'
import Content from 'components/Editor/Content'

import {
    loadArticle,
    deleteArticle,
    finishArticle,
    toFixArticle,
    publishArticle,
    delegateArticle
} from './actions'
import { rejectArticle } from 'containers/NewslistPage/actions'

import { loadEditors } from 'containers/App/actions'

import {
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
            article,
            rubrics,
            deleteArticle,
            rejectArticle,
            finishArticle,
            publishArticle,
            toFixArticle,
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
                    article={article}
                    rubrics={rubrics}
                    chatRoom={params.id}
                    preview={this.state.preview}
                    publish={publishArticle}
                    closePreview={this.closePreview}
                    editor={usersMap[article.EditorId]}>

                    <HeaderSupervisor
                        {...headerProps}
                        ret={toFixArticle.bind(this, article.id)}
                        publish={publishArticle} />
                </Content>
            )
        }
        else if (checkPermissons(user, ['editor'])) {
            return (
                <Content
                    article={article}
                    rubrics={rubrics}
                    chatRoom={params.id}
                    delegate={rejectArticle.bind(this, article.id)}
                    preview={this.state.preview}
                    finish={finishArticle}
                    closePreview={this.closePreview}>

                    <HeaderEditor
                        delegate={rejectArticle.bind(this, article.id)}
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
    article: selectArticle(state),
    rubrics: selectRubrics(state),
    usersMap: selectUsersMap(state),
    user: selectCurrentUser(state),
    menuOpen: selectMenuExpandedStatus(state)
})

const mapDispatchToProps = dispatch => ({
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
    rejectArticle(id) {
        dispatch(rejectArticle(id))
    },
    toFixArticle(id) {
        dispatch(toFixArticle(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage)
