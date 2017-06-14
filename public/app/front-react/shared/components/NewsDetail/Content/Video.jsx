import React, { PureComponent } from 'react'
import MediaQuery from 'react-responsive'
import classNames from 'classnames'

import Video from 'components/GeneralVideo'
import Rubrics from 'components/Rubrics'
import Img from 'components/Img'
import Socials from 'components/Socials';
import RenderSocialWidgets from './RenderSocialWidgets'
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
            RenderSocialWidgets()
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
        if (e.target.classList.value.indexOf('inner-about__text-bg-gray') > -1) {
            if (e.target.classList.value.indexOf('inner-about__text-bg-gray_play') > -1) {
                this.setState({
                    play: false
                })
            }
        } else {
            if (e.target.classList.value.indexOf('general-video') < 0) {
                this.setState({
                    play: false
                })
            }
        }
    }

    onContentClick(e) {
        const target = e.target

        if (!target.classList.contains('video__preview')) return;

        const parent = target.parentNode;
        const src = parent.dataset.src;

        if (!src) return;

        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', src);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', true);

        parent.replaceChild(iframe, target);
    }

    renderInfo() {
        const { data: { video_stream } } = this.props;

        if (!video_stream) return null;

        const author = video_stream.preview_author === 'undefined'
            ? ''
            : video_stream.preview_author;

        const source = video_stream.preview_source === 'undefined'
            ? ''
            : video_stream.preview_source;

        if (!author && !source) return null;

        return (
            <div className="inner-about__video-info">
                <div>
                    <div>
                        Фото:
                    </div>
                    {author}
                    {author && source && ' / '}
                    {source}
                </div>
            </div>
        )
    }

    render() {
        const { data, children } = this.props
        let theses = [];
        const body = (data.body||'').replace(/undefined \/ undefined|\/ undefined|undefined \//g, '');

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
                    <FormatDate value={data.publish_date} />
                </div>
                <div onClick={e => this.stop(e)} className={classNames('text-bg-gray text-bg-gray--news inner-about__text-bg-gray', {'inner-about__text-bg-gray_play' : this.state.play})}>
                    {theses.length
                        ? (
                            <div className={classNames('text-bg-gray__block-text', { 'text-bg-gray__block-text_play': this.state.play })}>
                                {theses.map((v, i) => (
                                    <div key={i} className="text-bg-gray__text text-bg-gray__text-lite">
                                        {v}
                                    </div>
                                ))}
                            </div>
                        )
                        : null
                    }
                    <MediaQuery minDeviceWidth="1300px">
                        {this.renderInfo()}
                    </MediaQuery>
                    <Video
                        className="general-news__general-video"
                        play={this.state.play}
                        onPlay={this.play}
                        left
                        data={data.video_stream} />
                    <div className={classNames("news-preview", {'news-preview_play' : this.state.play})}>
                        <Rubrics data={data.rubrics} className={!this.state.play ? 'active' : ''} />
                        <figure className="news-preview__img">
                            <Img
                                src={image.url}
                                title={image.object_name||''}
                                alt={image.object_name||''} />
                            {image.object_author && image.object_source
                                && (
                                    <figcaption className="news-preview__source">
                                        Фото: {image.object_author} / {image.object_source}
                                    </figcaption>
                                )
                            }
                        </figure>
                        <p className="news-preview__text">
                            {data.sub_title}
                        </p>
                        <MediaQuery maxDeviceWidth="1299px">
                            {this.renderInfo()}
                        </MediaQuery>
                    </div>
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
