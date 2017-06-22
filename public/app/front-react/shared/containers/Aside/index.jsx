import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import {
    selectHomeNoise,
    selectHomeBroadcast,
    makeSelectHomeNewsByCategory,
} from 'selectors/news'

import { selectCoverImg } from 'selectors/aside'
import { fetchCoverImg } from 'actions/aside'

import Content from 'components/Aside'

class Aside extends PureComponent {

    componentWillMount(){
        this.props.fetchCoverImg();
    }

    render() {
        const {noise, broadcast, top, now, inside, noisePage, coverImg, ...rest} = this.props

        return (
            <Content
                noise={noise ? noise.map(v => v.news) : null}
                top={top ? top.map(v => v.news) : null}
                broadcast={broadcast ? broadcast.map(v => v.record) : null}
                now={now ? now : null}
                inside={inside ? inside : false}
                noisePage={noisePage ? noisePage : false}
                coverImg={coverImg}
                {...rest}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    noise: ownProps.noise !== undefined ? ownProps.noise : selectHomeNoise(state),
    broadcast: ownProps.broadcast !== undefined ? ownProps.broadcast : selectHomeBroadcast(state),
    top: ownProps.top !== undefined ? ownProps.top : makeSelectHomeNewsByCategory(1)(state),
    coverImg: selectCoverImg(state),
})

const mapDispatchToProps = dispatch => ({
    fetchCoverImg(){
        dispatch(fetchCoverImg());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Aside)
