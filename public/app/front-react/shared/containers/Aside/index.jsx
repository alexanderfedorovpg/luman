import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { selectHomeNoise, selectHomeBroadcast } from 'selectors/news'

import Content from 'components/Aside'

class Aside extends PureComponent {

    render() {
        const { noise, broadcast } = this.props

        return (
            <Content
                noise={noise.map(v=>v.news)}
                broadcast={broadcast.map(v=>v.record)} />
        )
    }
}

const mapStateToProps = state => ({
    noise: selectHomeNoise(state),
    broadcast: selectHomeBroadcast(state)
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Aside)
