import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { push } from 'react-router-redux'

import { Wrap, Left, Right } from 'components/Content'
import Header from 'components/Working/Header'
import ContentSupervisor from 'components/Working/Content.supervisor'
import ContentEditor from 'components/Working/Content.editor'

import {
    loadNewslist,
    setFilter,
    rejectArticle,
    acceptArticle,
    deleteArticle,
    articleDelegate
} from './actions'
import { postMessage } from 'containers/App/actions'

import {
    selectNewsList,
    selectOldIds,
    selectFilter
} from './selectors'

import {
    selectEditors,
    selectCurrentUser,
    selectMenuExpandedStatus
} from 'containers/App/selectors'

import { groups } from 'containers/App/constants'
import { filters } from './constants'

import { checkPermissons } from 'utils/permissons'

class NewslistPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            selectedId: null,
            delegateModal: false,
            delegateCurrent: null
        };

        this.toggle = ::this.toggle;
        this.toggleDelegate = ::this.toggleDelegate
        this.delegateArticle = ::this.delegateArticle
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.loadNewslist()
        })
    }

    componentWillMount() {
        const { filter, setFilter, user } = this.props

        if (checkPermissons(user, ['admin', 'сommissioning-editor'])) {
            setFilter(filters.supervisor[0])
        }
        else if (checkPermissons(user, ['editor'])) {
            setFilter(filters.editor[0])
        }
    }

    filterNews() {
        let { news, user, filter } = this.props

        switch (filter) {
            case 'MY':
                return news.filter(item => item.editor_id === user.id)

            case 'FREE':
                return news.filter(item => !item.editor_id)

            case 'ASSIGNED':
                return news.filter(item => !!item.editor_id)

            default:
                return news
        }
    }

    toggle(articleId) {
        this.setState({
            modal: !this.state.modal,
            selectedId: articleId || null
        });
    }

    toggleDelegate(current, id) {
        this.setState({
            delegateModal: !this.state.delegateModal,
            delegateCurrent: current || null,
            delegateId: id || null
        });
    }

    delegateArticle(params) {
        this.setState({
            delegateCurrent: params
        });
    }

    renderContent() {
        let {
            menuOpen,
            filter,
            setFilter,
            rejectArticle,
            acceptArticle,
            deleteArticle,
            delegateArticle,
            postMessage,
            oldNews,
            users,
            user,
            push
        } = this.props


        const contentProps = {
            news: this.filterNews(),
            old: oldNews,
            push
        }

        const headerProps = {
            moved: menuOpen,
            filter,
            setFilter
        }

        const delegateProps = {
            user: this.state.delegateCurrent,
            users: users.toJS(),
            delegateOpen: this.state.delegateModal,
            toggleDelegate: this.toggleDelegate,
            delegate: params => {
                this.delegateArticle(params);
                delegateArticle({id: this.state.delegateId, user: params})
            }
        }

        if (checkPermissons(user, ['admin', 'сommissioning-editor'])) {
            headerProps.filterData = filters.supervisor

            return (
                <div>
                    <Header {...headerProps} />

                    <Wrap>
                        <ContentSupervisor
                            {...contentProps}
                            {...delegateProps}
                            clearTask={rejectArticle}
                            deleteTask={() => {
                                deleteArticle(this.state.selectedId)}}
                            postMessage={postMessage}
                            toggle={this.toggle}
                            open={this.state.modal}
                            />
                    </Wrap>
                </div>
            )
        }
        else if (checkPermissons(user, ['editor'])) {
            headerProps.filterData = filters.editor

            return (
                <div>
                    <Header {...headerProps} />
                    <ContentEditor
                        {...contentProps}
                        reject={rejectArticle}
                        accept={acceptArticle} />
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
                    title="В работе" />

                {this.renderContent()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    news: selectNewsList(state),
    oldNews: selectOldIds(state),
    users: selectEditors(state),
    user: selectCurrentUser(state),
    filter: selectFilter(state),
    menuOpen: selectMenuExpandedStatus(state)
})

const mapDispatchToProps = dispatch => ({
    loadNewslist() {
        dispatch(loadNewslist())
    },
    setFilter(filter) {
        dispatch(setFilter(filter.value))
    },
    rejectArticle(id) {
        dispatch(rejectArticle(id))
    },
    acceptArticle(id) {
        dispatch(acceptArticle(id))
    },
    delegateArticle(params) {
        dispatch(articleDelegate(params))
    },
    deleteArticle(id) {
        dispatch(deleteArticle(id))
    },
    postMessage(room, message) {
        dispatch(postMessage(room, message))
    },
    push(url) {
        dispatch(push(url))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewslistPage)
