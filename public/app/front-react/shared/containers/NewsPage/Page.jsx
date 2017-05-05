import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

import {
    selectNoise,
    selectRelated,
    selectTop,
    selectTopData
} from 'selectors/news'
import { selectBroadcast } from 'selectors/broadcast'

import { fetchTop, fetchNoise, fetchRelated } from 'actions/news'
import { fetch as fetchRecords } from 'actions/broadcast'

import Detail from 'components/NewsDetail'

class NewsPage extends PureComponent {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { match } = this.props

        this.props.fetchTop()
        this.props.fetchNoise()
        this.props.fetchRecords()

        if (match.params.id) {
            // this.props.fetch({ id: match.params.id })
            // this.props.fetchRelated(match.params.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            // this.props.fetch({ id: nextProps.match.params.id })

            // if (nextProps.match.params.id) {
            //     this.props.fetchRelated(nextProps.match.params.id)
            // }
        }
    }

    getById(id) {
        const { topData } = this.props

        return topData[id] || {}
    }

    render() {
        let { noise, news, match, relatedNews, broadcast } = this.props
        const item = this.getById(match.params.id)

        return (
            <div>
                <Helmet>
                    <title>Новости</title>
                </Helmet>

                {match.params.id
                    ? (
                        <Detail
                            data={item}
                            noise={noise}
                            related={relatedNews}
                            broadcast={broadcast} />
                    )
                    : (
                        <ul>
                            {news.map(v => (
                                <li key={v.id}>
                                    <Link to={`/news/${v.id}`}>
                                        {v.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    noise: selectNoise(state),
    topData: selectTopData(state),
    news: selectTop(state),
    relatedNews: selectRelated(state),
    broadcast: selectBroadcast(state)
})

const mapDispatchToProps = dispatch => ({
    fetchTop(params) {
        dispatch(fetchTop(params))
    },
    fetchNoise(params) {
        dispatch(fetchNoise(params))
    },
    fetchRelated(id) {
        dispatch(fetchRelated(id))
    },
    fetchRecords() {
        dispatch(fetchRecords())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage)
