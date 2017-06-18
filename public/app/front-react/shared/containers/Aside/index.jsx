import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import {
    selectHomeNoise,
    selectHomeBroadcast,
    makeSelectHomeNewsByCategory,
} from 'selectors/news'

import Content from 'components/Aside'

class Aside extends PureComponent {

    render() {
        const { noise, broadcast, top, now, inside, noisePage } = this.props

        return (
            <Content
                noise={noise ? noise.map(v => v.news) : null}
                top={top ? top.map(v => v.news) : null}
                broadcast={broadcast ? broadcast.map(v => v.record) : null}
                now={now ? now : null}
                inside={inside ? inside : false}
                noisePage={noisePage ? noisePage : false}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    noise: ownProps.noise !== undefined ? ownProps.noise : selectHomeNoise(state),
    broadcast: ownProps.broadcast !== undefined ? ownProps.broadcast : selectHomeBroadcast(state),
    top: ownProps.top !== undefined ? ownProps.top : makeSelectHomeNewsByCategory(1)(state),
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Aside)
