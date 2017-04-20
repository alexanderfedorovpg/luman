import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { getNews, getVideoNews } from 'reducers'

import { fetch, fetchVideo } from 'actions/news'

import Home from 'components/HomePage'

class HomePage extends PureComponent {

    constructor(props) {
        super(props);

    }

    asyncBootstrap() {
        this.props.fetchNews()
        this.props.fetchVideoNews()
    }

    render() {
        let { news, videoNews } = this.props

        return (
            <div>
                <Helmet>
                    <title>Главная</title>
                </Helmet>

                <Home news={news} videoNews={videoNews} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    news: getNews(state),
    videoNews: getVideoNews(state)
})

const mapDispatchToProps = dispatch => ({
    fetchNews() {
        dispatch(fetch())
    },
    fetchVideoNews() {
        dispatch(fetchVideo())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
