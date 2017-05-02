import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import {
    selectNoise,
    selectRelated,
    selectNewsData
} from 'selectors/news'

import { fetch, fetchRelated } from 'actions/news'

import Noise from 'components/NoisePage'

class NoisePage extends PureComponent {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { match } = this.props

        this.props.fetch()
        this.props.fetchRelated(match.params.id)
    }

    getById(id) {
        const { newsData } = this.props

        return newsData[id] || {}
    }

    render() {
        let { news, match, relatedNews } = this.props
        const item = this.getById(match.params.id)

        return (
            <main>
                <Helmet>
                    <title>Инфошум</title>
                </Helmet>

                <Noise
                    data={item}
                    news={news}
                    related={relatedNews} />
            </main>
        )
    }
}

const mapStateToProps = state => ({
    news: selectNoise(state),
    newsData: selectNewsData(state),
    relatedNews: selectRelated(state)
})

const mapDispatchToProps = dispatch => ({
    fetch() {
        dispatch(fetch())
    },
    fetchRelated(id) {
        dispatch(fetchRelated(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NoisePage)
