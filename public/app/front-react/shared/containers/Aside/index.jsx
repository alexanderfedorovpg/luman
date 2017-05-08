import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { selectBroadcast } from 'selectors/broadcast'
import { selectNoise } from 'selectors/news'

import Content from 'components/Aside'

class Aside extends PureComponent {

    render() {
        const { noise, broadcast } = this.props

        return (
            <Content noise={noise} broadcast={broadcast} />
        )
    }
}

const mapStateToProps = state => ({
    noise: selectNoise(state),
    broadcast: selectBroadcast(state)
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Aside)
