import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import Header from 'components/Ready/Header'
import Content from 'components/Ready/Content'
import { Wrap } from 'components/Content'

import { filters } from './constants'

import {
    loadReadyNews,
    publishArticle,
    setFilters
} from './actions'

import {
    selectNewsList,
    selectOldIds
} from './selectors'

class ReadyPage extends PureComponent {

    componentWillMount() {
        this.props.loadNews()
    }

    render() {
        let { news, oldNews, publish, setFilters } = this.props

        return (
            <div>
                <Helmet
                    title="Готовые новости" />

                <Header
                    filters={filters}
                    setFilters={setFilters} />
                <Wrap>
                    <Content
                        data={news}
                        old={oldNews}
                        publish={publish} />
                </Wrap>
            </div>
        )
    }
}

const mapStateToProps = state => ({
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
    setFilters(filters) {
        dispatch(setFilters(filters))

        dispatch(loadReadyNews({}))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReadyPage)
