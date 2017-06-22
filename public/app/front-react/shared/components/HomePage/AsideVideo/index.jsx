import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { selectCoverImg } from 'selectors/aside'
import { fetchCoverImg } from 'actions/aside'

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
    componentWillMount(){
        this.props.fetchCoverImg();
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
        const { className, main, videos, coverImg } = this.props
        if (!videos) return null

        const data = videos[0] || {}
        return data.video_stream
            ? (
                <div style={{position: 'relative'}}>
                    {this.state.play && <div className="general-video__close" onClick={() => this.stop()}><img src={close}/></div>}
                    <div className={classNames(
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
                                    <video ref='video' id='videoStream' style={{
                                        width:    100 + '%',
                                        height:   100 + '%',
                                        zIndex:   9,
                                        position: 'relative'
                                    }} controls="controls"/>
                                </div>
                                :
                                (
                                    <span className="general-video__play-block">
                                    <a onClick={this.play} className="general-video__link"/>
                                    <Img className="general-video__img" src={coverImg || data.video_stream.preview} alt=""/>
                                        {data.url ?
                                            <img onClick={this.play}
                                                 className="general-video__ico"
                                                 src="/content/video-ico/video-ico-big.svg" alt="" role="presentation"/>
                                            :
                                            <img className="general-video__ico"
                                                 src="/content/video-ico/video-ico-big.svg" alt="" role="presentation"/>
                                        }
                                        <div className="general-video__info">
                                        <div className="general-video__date general-video__date general-video__date_position">
                                            <span className="general-video__span">{this.getPublishDate(data.created_at)}</span>
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
                </div>

            )
            : (
                <img src={main ? mainVideoPlaceholder : insideVideoPlaceholder} className="general-video__img" />
            )
    }
}

const mapStateToProps = (state, ownProps) => ({
    coverImg: selectCoverImg(state),
})

const mapDispatchToProps = dispatch => ({
    fetchCoverImg(){
        dispatch(fetchCoverImg());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AsideVideo)
