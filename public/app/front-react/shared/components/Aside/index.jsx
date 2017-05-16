import React, { PureComponent } from 'react'
import classNames from 'classnames'

import Video from 'components/GeneralVideo'
import Noise from 'components/Noise'
import One from 'components/Broadcast/One'
import Subscribe from 'components/Subscribe'

class Aside extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            play: false
        }

        this.play = this.play.bind(this)
    }

    play() {
        this.setState({
            play: true
        })
    }

    render() {
        const { noise, broadcast, className } = this.props
        const first = broadcast[0] || {}

        return (
            <div className={classNames('right-col', className)}>
                <Video
                    data={first.video_stream}
                    collapsed={!this.state.play}
                    play={this.state.play}
                    onPlay={this.play}
                    playTitle="date"
                    title="Все ключевые события этого дня" />
                <Noise data={noise} />
                <One data={broadcast[1]}/>
                <Subscribe />
            </div>
        )
    }
}

export default Aside
