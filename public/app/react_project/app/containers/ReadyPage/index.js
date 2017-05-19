import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { push } from 'react-router-redux'

import Header from 'components/Ready/Header'
import Content from 'components/Ready/Content'
import { Wrap } from 'components/Content'

import { filters } from './constants'

import {
    loadReadyNews,
    publishArticle,
    delegateArticle,
    setFilters
} from './actions'

import {
    selectNewsList,
    selectOldIds
} from './selectors'
import {
    selectMenuExpandedStatus
} from 'containers/App/selectors'

class ReadyPage extends PureComponent {

    componentWillMount() {
        setTimeout(() => (
            this.props.loadNews()
        ))
    }

    filterData() {
        const { params: { type }, news } = this.props

        switch (type) {
            case 'published':
                return news
                    .filter(v => +v.is_publish)
                    .sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date))

            default:
                return news.filter(v => !+v.is_publish)
        }
    }

    render() {
        let {
            params,
            menuOpen,
            oldNews,
            delegate,
            publish,
            pushPath,
            setFilters
        } = this.props

        return (
            <div>
                <Helmet
                    title="Готовые новости" />

                <Header
                    moved={menuOpen}
                    filters={filters}
                    setFilters={setFilters} />
                <Wrap>
                    <Content
                        data={this.filterData()}
                        old={oldNews}
                        publish={publish}
                        published={params.type=='published'}
                        push={pushPath}
                        delegate={delegate} />
                </Wrap>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    menuOpen: selectMenuExpandedStatus(state),
    news: selectNewsList(state),
    oldNews: selectOldIds(state)
})

const mapDispatchToProps = dispatch => ({
    loadNews(params) {
        dispatch(loadReadyNews(params))
    },
    publish(id) {
        dispatch(publishArticle(id))
    },
    delegate(params) {
        dispatch(delegateArticle(params))
    },
    setFilters(filters) {
        dispatch(setFilters(filters))

        dispatch(loadReadyNews({}))
    },
    pushPath(path) {
        dispatch(push(path))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReadyPage)
