import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { Wrap, Left, Right } from 'components/Content'
import Header from 'components/Working/Header'
import ContentSupervisor from 'components/Working/Content.supervisor'
import ContentEditor from 'components/Working/Content.editor'

import {
    loadNewslist,
    setFilter,
    rejectArticle,
    acceptArticle
} from './actions'

import {
    selectNewsList,
    selectOldIds,
    selectFilter
} from './selectors'

import {
    selectCurrentUser,
    selectMenuExpandedStatus
} from 'containers/App/selectors'

import { groups } from 'containers/App/constants'
import { filters } from './constants'

import { checkPermissons } from 'utils/permissons'

class NewslistPage extends Component {

    componentDidMount() {
        this.props.loadNewslist()
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
                return news.filter(item => item.editor_id === 0)

            case 'ASSIGNED':
                return news.filter(item => item.editor_id !== 0)

            default:
                return news
        }
    }

    renderContent() {
        let {
            menuOpen,
            filter,
            setFilter,
            rejectArticle,
            acceptArticle,
            oldNews,
            user
        } = this.props

        const contentProps = {
            news: this.filterNews(),
            old: oldNews
        }

        const headerProps = {
            moved: menuOpen,
            filter,
            setFilter
        }

        if (checkPermissons(user, ['admin', 'сommissioning-editor'])) {
            headerProps.filterData = filters.supervisor

            return (
                <div>
                    <Header {...headerProps} />

                    <Wrap>
                        <ContentSupervisor {...contentProps} />
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewslistPage)