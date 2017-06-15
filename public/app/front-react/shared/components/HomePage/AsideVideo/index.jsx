import React, { PureComponent } from 'react'

import GeneralVideo from 'components/GeneralVideo'
import insideVideoPlaceholder from './obzor-inside-new.jpg'
import mainVideoPlaceholder from './obzor-main-new.jpg'
import close from './close.png'
import Img from 'components/Img';
import { ensureAbs } from 'shared/utils/uri';
import classNames from 'classnames';
import {FormattedRelative, FormattedDate, FormattedTime, addLocaleData} from 'react-intl';
import ru from 'react-intl/locale-data/ru'

class AsideVideo extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            play: false
        }

        this.play = this.play.bind(this)
    }

    stop(){
        if(this.state.play){
            this.setState({play: false})
        }
    }

    play() {
        this.setState({
            play: true
        })
        let that = this;
        setTimeout(() => {
            const videoSource = this.props.videos;
            let i = 0;
            const videoCount = videoSource.length;
            const videoNode = this.refs.video;
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
                if (i == 5) {
                    that.stop();
                    return false;
                }else{
                    videoPlay(i)
                }
            }
        }, 0)
    }

    getPublishDate() {
        addLocaleData([...ru]);
        return <FormattedDate day='numeric' month='long' value={new Date()}/>;
    }

    render() {
        const { className, main, videos } = this.props
        if (!videos) return null

        const data = videos[0] || {}
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
                            <div style={{width: 100 + '%', height: 100 + '%'}}>
                                <div className="general-video__close" onClick={()=>this.stop()}><img src={close}/></div>
                                <video ref='video' id='videoStream' style={{width: 100 + '%', height: 100 + '%', zIndex: 9,position: 'relative'}} controls="controls" />
                            </div>

                            :
                            (
                                <span className="general-video__play-block">
                                    <a onClick={this.play} className="general-video__link" />
                                    <Img className="general-video__img" src={data.video_stream.preview} alt="" />
                                    {data.url ?

                                        <img onClick={this.play} className="general-video__ico" src="/content/video-ico/video-ico-big.svg" alt="" role="presentation" />
                                        :
                                        <img className="general-video__ico" src="/content/video-ico/video-ico-big.svg" alt="" role="presentation" />
                                    }
                                    <div className="general-video__info">
                                        <div className="general-video__date general-video__date general-video__date_position">
                                            {/*data.url ?

                                                <img onClick={this.play} className="general-video__ico" src="/content/video-ico/play_time.svg" alt="" role="presentation" />
                                                :
                                                <img className="general-video__ico" src="/content/video-ico/play_time.svg" alt="" role="presentation" />
                                            */}
                                            <span className="general-video__span">{this.getPublishDate()}</span>
                                        </div>
                                        <div className="general-video__title">
                                            Ваш персональный ведущий
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
