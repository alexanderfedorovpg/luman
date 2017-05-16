import React, { PureComponent, Children, cloneElement } from 'react'

class VideoWrapper extends PureComponent {

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
        const { children } = this.props

        return cloneElement(Children.only(children), {
            onPlay: this.play,
            play: this.state.play
        })
    }
}

export default VideoWrapper
