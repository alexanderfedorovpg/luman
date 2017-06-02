import React, { PureComponent } from 'react'
import classNames from 'classnames'

import Video from 'components/GeneralVideo'
import Noise from 'components/Noise'
import FromEnter from 'components/Broadcast/One'
import Subscribe from 'components/Subscribe'

import mainVideoPlaceholder from './obzor-inside-new.jpg'
import efirPlaceholder from './efir.jpg'

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
        const rest = broadcast.slice(1)

        return (
            <div className={classNames('right-col', className)}>
                {first.video_stream
                    ? (
                        <Video
                            data={first.video_stream}
                            collapsed={!this.state.play}
                            play={this.state.play}
                            onPlay={this.play}
                            playTitle="date"
                            title="Все ключевые события этого дня" />
                    )
                    : (
                        <img src={mainVideoPlaceholder} className="general-video__img" />
                    )
                }
                <Noise data={noise} />
                {rest.length
                    ? <FromEnter data={rest}/>
                    : <img src={efirPlaceholder} className="from-enter enter-one" />
                }
                <Subscribe />
            </div>
        )
    }
}

export default Aside
