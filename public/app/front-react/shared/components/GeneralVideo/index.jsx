import React, { PureComponent } from 'react'
import classNames from 'classnames'

import './style.scss'
// import logo from './purple-rtvi.png'

class Video extends PureComponent {

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
        const { data, playTitle, title, left, className } = this.props
        let play

        switch (playTitle) {
            case 'date':
                play = '27 марта'
                break

            case 'duration':
            default:
                play = `${(data||{}).duration}`.replace('.', ':')
        }

        const image = (data||{}).preview || '/content/general-video/general-video.jpg'

        return (
            <div className={classNames('general-video', className, {
                    'general-video_play': this.state.play,
                    'general-video_left': left
                })}>
                {this.state.play
                    ? <iframe src={(data||{}).url} />
                    : (
                        <span>
                            <a onClick={this.play} className="general-video__link" />
                            <img className="general-video__img" src={image} alt="" />
                            <div className="general-video__info">
                                <div className="general-video__date general-video__date general-video__date_position">
                                    <img className="general-video__ico" src="/content/video-ico/video-ico.png" alt="" role="presentation" />
                                    <span className="general-video__span">{play}</span>
                                </div>
                                <div className="general-video__title">
                                    {title}
                                </div>
                                <div className="general-video__logo">
                                    <span className="general-video__logo-title">
                                        {left
                                            ? 'News'
                                            : 'Today'
                                        }
                                    </span>
                                </div>
                            </div>
                        </span>
                    )
                }
            </div>
        )
    }
}

export default Video
