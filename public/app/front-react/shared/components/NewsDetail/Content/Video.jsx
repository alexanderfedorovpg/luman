import React, { PureComponent } from 'react'
import MediaQuery from 'react-responsive'
import classNames from 'classnames'
import {replaceStrToLink} from 'shared/utils/uri';

import Video from 'components/GeneralVideo'
import Rubrics from 'components/Rubrics'
import Img from 'components/Img'
import Socials from 'components/Socials';
import renderSocialWidgets from './renderSocialWidgets'
import FormatDate from 'components/FormatDate';

class Content extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            play: false,
            overlay: {
                width: '0px',
                height: '0px'
            }
        }

        this.play = this.play.bind(this)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.stop = this.stop.bind(this);
    }

    replaceWidgets() {
        if (this._timer) clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            renderSocialWidgets()
        }, 1000)
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.replaceWidgets()
    }

    componentDidUpdate() {
        this.replaceWidgets()
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({
            overlay: {
                width: `${window.innerWidth + 1000}px`,
                height: `${document.body.scrollHeight}px`
            }
        });
    }

    play() {
        this.setState({
            play: true
        })

        setTimeout(() => {
            const video = document.getElementById('videoStream');

            video.addEventListener('ended', () => {
                this.setState({
                    play: false
                })
            }, false);

        }, 0)
    }

    stop(e) {
        const { classList } = e.target;

        if (classList.contains('inner-about__text-bg-gray')) {
            if (classList.contains('inner-about__text-bg-gray_play')) {
                this.setState({
                    play: false
                })
            }
        } else {
            if (!classList.contains('general-video')) {
                this.setState({
                    play: false
                })
            }
        }
    }

    onContentClick(e) {
        const target = e.target
        const parent = target.parentNode;

        if (target.classList.contains('video__overlay')) {
            parent.parentNode.classList.remove('video_playing');
            parent.querySelector('.video__element').pause();
            return;
        }

        if (!target.classList.contains('video__preview-wrapper')) return;

        const src = parent.dataset.src;

        if (!src) return;

        if (!target.querySelector('.video__element')) {
            const video = document.createElement('video');
            video.setAttribute('src', src);
            video.setAttribute('allowfullscreen', true);
            video.setAttribute('autoplay', true);
            video.setAttribute('controls', 'controls');
            video.classList.add('video__element');
            target.appendChild(video);
            const overlay = document.createElement('div');
            overlay.classList.add('video__overlay');
            target.insertBefore(overlay, video);
        }

        parent.classList.add('video_playing');
    }

    renderInfo() {
        const { data: { video_stream } } = this.props;

        if (!video_stream) return null;

        const author = video_stream.preview_author || '';
        const source = video_stream.preview_source || '';

        if (!author && !source) return null;

        return (
            <div className="inner-about__video-info">
                <div>
                    <span className="inner-about__photo">Фото: </span>
                    <span dangerouslySetInnerHTML={{__html:replaceStrToLink(`${author} ${author && source && ' / '} ${source}`)}}/>
                </div>
            </div>
        )
    }

    render() {
        const { data, children } = this.props
        let theses = [];
        let body = (data.body||'').replace(/undefined \/ undefined|\/ undefined|undefined \//g, '');
        body = replaceStrToLink(body);

        if (data.theses) {
            theses = Array.isArray(data.theses)
                ? data.theses
                : `${data.theses}`.split('\\');
        }

        const image = data.image_preview || {};

        return (
            <div>
                <div onClick={this.stop} style={this.state.overlay} className={classNames('inner-about-video_overlay', {'is-active' : this.state.play})}></div>
                <h1>
                    {data.title}
                </h1>
                <div className="inner-about__date">
                    <FormatDate created={data.publish_date} />
                </div>
                <div className={classNames('text-bg-gray text-bg-gray--news inner-about__text-bg-gray', {'inner-about__text-bg-gray_play' : this.state.play})}>
                    {theses.length
                        ? (
                            <div className={classNames('text-bg-gray__block-text', { 'text-bg-gray__block-text_play': this.state.play })}>
                                {theses.map((v, i) => (
                                    <div key={i}
                                         dangerouslySetInnerHTML={{ __html: replaceStrToLink(v) }}
                                         className="text-bg-gray__text text-bg-gray__text-lite"
                                    />
                                ))}
                            </div>
                        )
                        : null
                    }
                    <MediaQuery minWidth="1250px">
                        {this.renderInfo()}
                    </MediaQuery>
                    <Video
                        className="general-news__general-video"
                        play={this.state.play}
                        onPlay={this.play}
                        left
                        data={data.video_stream} />
                    <MediaQuery maxWidth="614px">
                        {this.renderInfo()}
                    </MediaQuery>
                    <div className={classNames("news-preview", {'news-preview_play' : this.state.play})}>
                        <Rubrics data={data.rubrics} className={!this.state.play ? 'active' : ''} />
                        <figure className="news-preview__img">
                            <Img
                                src={image.url}
                                title={image.object_name||''}
                                alt={image.object_name||''}
                            />
                            {
                                !!image.object_name &&
                                <figcaption className="news-preview__title"
                                            dangerouslySetInnerHTML={{__html: replaceStrToLink(image.object_name)}}
                                />
                            }
                            {(image.object_author || image.object_source)
                                && (
                                    <figcaption className="news-preview__source"
                                        dangerouslySetInnerHTML={{__html: replaceStrToLink(`Фото: ${image.object_author || image.object_author} ${image.object_author && image.object_source && ' / '} ${image.object_source || image.object_source}`)}}
                                    />
                                )
                            }
                        </figure>
                        <p className="news-preview__text"
                           dangerouslySetInnerHTML={{__html: replaceStrToLink(data.sub_title)}}
                        />
                    </div>
                    <MediaQuery minWidth="615px" maxWidth="1249px">
                        {this.renderInfo()}
                    </MediaQuery>
                    <Socials shareLink={data.uri} title={data.title}/>
                </div>
                <div className="inner-about__content">
                    <div
                        dangerouslySetInnerHTML={{ __html: body }}
                        onClick={this.onContentClick}
                    />
                    {children}
                </div>
            </div>
        )
    }
}

export default Content
