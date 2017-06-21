import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import {
    fetchOnline
} from 'actions/news'

import {
    makeSelectHomeNewsByCategory,
    selectHomeBroadcast,
    selectHomeNoise,
    selectWarMode,
    selectWarTitle,
    selectOnline
} from 'selectors/news'

import Home from 'components/HomePage'
import HomeWar from 'components/HomePage/War'

class HomePage extends PureComponent {

    asyncBootstrap() {
        this.props.fetchOnline()
    }

    componentDidMount() {
        this.asyncBootstrap()
    }

    render() {
        let {
            noise,
            broadcast,
            today,
            now,
            other,
            breakingNews,
            newsBlock,
            warMode,
            warTitle,
            online
        } = this.props

        return (
            <div>
                <Helmet>
                    <title>Главная</title>
                </Helmet>

                {warMode
                    ? (
                        <HomeWar
                            title={warTitle}
                            online={online}
                            now={now.map(v => v.news)}
                            today={today.map(v => v.news)}
                            other={other.map(v => v.news)}
                            breakingNews={breakingNews.map(v => v.data)}
                            newsBlock={newsBlock.map(v => v.data)}
                            broadcast={broadcast} />
                    )
                    : (
                        <Home
                            now={now.map(v => v.news)}
                            today={today.map(v => v.news)}
                            other={other.map(v => v.news)}
                            noise={noise.map(v => v.news)}
                            broadcast={broadcast} />
                    )
                }
            </div>
        )
    }
}

const selectHomeNow = makeSelectHomeNewsByCategory(1)
const selectHomeToday = makeSelectHomeNewsByCategory(2)
const selectHomeOther = makeSelectHomeNewsByCategory(3)
const selectHomeBreaking = makeSelectHomeNewsByCategory(4)
const selectHomeBlock = makeSelectHomeNewsByCategory(5)

const mapStateToProps = state => ({
    now: selectHomeNow(state),
    today: selectHomeToday(state),
    other: selectHomeOther(state),
    noise: selectHomeNoise(state),
    breakingNews: selectHomeBreaking(state),
    newsBlock: selectHomeBlock(state),
    broadcast: selectHomeBroadcast(state),
    warMode: selectWarMode(state),
    warTitle: selectWarTitle(state),
    online: selectOnline(state)
})

const mapDispatchToProps = dispatch => ({
    fetchOnline() {
        dispatch(fetchOnline())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
