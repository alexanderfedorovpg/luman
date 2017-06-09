import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { FormattedRelative, injectIntl } from 'react-intl'

import Video from 'components/GeneralVideo'
import Rubrics from 'components/Rubrics'
import Img from 'components/Img'
import Socials from 'components/Socials';
import RenderSocialWidgets from 'components/NewsDetail/Content/RenderSocialWidgets'

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

    componentDidUpdate() {
        this.replaceWidgets()
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.replaceWidgets()
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
        React.render('<div id="video-overlay"></div>', document.body);
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
        const { data, intl, children } = this.props
        const theses = Array.isArray(data.theses)
            ? data.theses
            : `${data.theses}`.split('\\')

        const date = Date.parse(data.publish_date) && intl.formatDate(
            data.publish_date,
            {
                month: 'long',
                day: '2-digit'
            }
        )

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
                <div onClick={e => this.stop(e)} className={classNames('text-bg-gray text-bg-gray--news inner-about__text-bg-gray broadcast__text-bg-gray', {'inner-about__text-bg-gray_play' : this.state.play})}>
                    {theses.length && (
                        <div className={classNames('text-bg-gray__block-text', { 'text-bg-gray__block-text_play': this.state.play })}>
                            {theses.map((v, i) => (
                                <div key={i} className="text-bg-gray__text text-bg-gray__text-lite">
                                    {v}
                                </div>
                            ))}
                        </div>
                    )}
                    <Video
                        className="broadcast__general-video"
                        play={this.state.play}
                        onPlay={this.play}
                        title={`${(data.program||{}).name} ${date}`}
                        left
                        data={data.video_stream} />

                    <div className="inner-about__subtitle">
                        {data.sub_title}
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

export default injectIntl(Content)
