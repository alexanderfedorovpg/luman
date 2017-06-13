import React, { PureComponent } from 'react'

import GeneralVideo from 'components/GeneralVideo'
import insideVideoPlaceholder from './obzor-inside-new.jpg'
import mainVideoPlaceholder from './obzor-main-new.jpg'
import Img from 'components/Img';
import { ensureAbs } from 'shared/utils/uri';
import classNames from 'classnames';

class AsideVideo extends PureComponent {

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


        setTimeout(() => {
            const videoSource = this.props.videos;
            let i = 0;
            const videoCount = videoSource.length;
            const videoNode = this.refs.wrapp.childNodes[0];
            function videoPlay(videoNum) {
                if (videoSource[videoNum].video_stream.url) {
                    videoNode.setAttribute("src", ensureAbs(videoSource[videoNum].video_stream.url));
                    videoNode.load();
                    videoNode.play();
                } else {
                    myHandler();
                }
            }
            videoNode.addEventListener('ended', myHandler, false);
            videoPlay(0);

            function myHandler() {
                i++;
                if (i == videoCount) {
                    i = 0;
                    videoPlay(i);
                } else {
                    videoPlay(i);
                }
            }
        }, 0)
    }

    render() {
        const { data, className, main, videos } = this.props


        return data.video_stream
            ? (
                <div
                    className={classNames(
                        'general-video',
                        className,
                        {
                            'general-video_play': this.state.play
                        },
                    )}
                    ref="wrapp"
                >
                    {
                        this.state.play ?

                            <video  ref='video' id='videoStream' style={{width: 100 + '%', height: 100 + '%'}} controls="controls" />

                            :
                            (
                                <span className="general-video__play-block">
                                    <a onClick={this.play} className="general-video__link" />
                                    <Img className="general-video__img" src={data.video_stream.preview} alt="" />
                                    <div className="general-video__info">
                                        <div className="general-video__date general-video__date general-video__date_position">
                                            {data.url ?

                                                <img onClick={this.play} className="general-video__ico" src="/content/video-ico/play_time.svg" alt="" role="presentation" />
                                                :
                                                <img className="general-video__ico" src="/content/video-ico/play_time.svg" alt="" role="presentation" />
                                            }
                                            <span className="general-video__span">27 марта</span>
                                        </div>
                                        <div className="general-video__title">
                                            Все ключевые события этого дня
                                        </div>
                                        <div className="general-video__logo">
                                            <span className="general-video__logo-title">
                                                TODAY
                                            </span>
                                        </div>
                                    </div>
                                </span>
                            )
                    }
                </div>
            )
            : (
                <img src={main ? mainVideoPlaceholder : insideVideoPlaceholder} className="general-video__img" />
            )
    }
}

export default AsideVideo
