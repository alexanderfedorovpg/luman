import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { FormattedRelative } from 'react-intl'

import Video from 'components/GeneralVideo'
import Rubrics from 'components/Rubrics'
import Img from 'components/Img'
import Socials from 'components/Socials';

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

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({
            overlay: {
                width: `${window.innerWidth}px`,
                height: `${document.body.scrollHeight}px`
            }
        });
    }

    play() {
        this.setState({
            play: true
        })
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

    render() {
        const { data, children } = this.props
        const theses = Array.isArray(data.theses)
            ? data.theses
            : `${data.theses}`.split('\\')

        const image = data.image_preview || {};

        return (
            <div>
                <div onClick={this.stop} style={this.state.overlay} className={classNames('inner-about-video_overlay', {'is-active' : this.state.play})}></div>
                <h1>
                    {data.title}
                </h1>
                <div className="inner-about__date">
                    {Date.parse(data.publish_date)
                        ? <FormattedRelative value={data.publish_date} />
                        : null
                    }
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
                    {(true || data.video_stream.preview_source) && (
                        <div className="inner-about__video-info">
                            <div>
                                Фото:
                            </div>
                            {data.video_stream.id}
                            {' / '}
                            {data.video_stream.id}
                        </div>
                    )}
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
                    </div>
                    <Socials shareLink={data.uri} title={data.title}/>
                </div>
                <div className="inner-about__content">
                    <div dangerouslySetInnerHTML={{ __html: data.body }} />
                    {children}
                </div>
            </div>
        )
    }
}

export default Content
