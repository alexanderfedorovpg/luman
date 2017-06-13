import React, { PureComponent } from 'react'

import GeneralVideo from 'components/GeneralVideo'

import insideVideoPlaceholder from './obzor-inside-new.jpg'
import mainVideoPlaceholder from './obzor-main-new.jpg'

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
        const { data, className, main } = this.props

        return data.video_stream
            ? (
                <GeneralVideo
                    data={data.video_stream}
                    collapsed={!this.state.play}
                    play={this.state.play}
                    onPlay={this.play}
                    className={className}
                    playTitle="date"
                    title="Ваш персональный ведущий" />
            )
            : (
                <div className="general-video general-video_no-overlay">
                    <img src={main ? mainVideoPlaceholder : insideVideoPlaceholder} className="general-video__img" />
                </div>
            )
    }
}

export default Aside
