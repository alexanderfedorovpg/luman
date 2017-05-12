import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import {
    makeSelectHomeNewsByCategory,
    selectHomeBroadcast,
    selectHomeNoise,
    selectWarMode
} from 'selectors/news'

import { fetchHome } from 'actions/news'

import Home from 'components/HomePage'

class HomePage extends PureComponent {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchHome()
    }

    render() {
        let { noise, broadcast, today, now, other, warMode } = this.props

        return (
            <div>
                <Helmet>
                    <title>Главная</title>
                </Helmet>

                <Home
                    now={now.map(v => v.news)}
                    today={today.map(v => v.news)}
                    other={other.map(v => v.news)}
                    noise={noise.map(v => v.news)}
                    broadcast={broadcast}
                    war={warMode} />
            </div>
        )
    }
}

const selectHomeNow = makeSelectHomeNewsByCategory(1)
const selectHomeToday = makeSelectHomeNewsByCategory(2)
const selectHomeOther = makeSelectHomeNewsByCategory(3)

const mapStateToProps = state => ({
    now: selectHomeNow(state),
    today: selectHomeToday(state),
    other: selectHomeOther(state),
    noise: selectHomeNoise(state),
    broadcast: selectHomeBroadcast(state),
    warMode: selectWarMode(state)
})

const mapDispatchToProps = dispatch => ({
    fetchHome() {
        dispatch(fetchHome())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
