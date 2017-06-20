import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { FormattedRelative, injectIntl } from 'react-intl'

import Video from 'components/GeneralVideo'
import Rubrics from 'components/Rubrics'
import Img from 'components/Img'
import Socials from 'components/Socials';
import renderSocialWidgets from 'components/NewsDetail/Content/renderSocialWidgets'

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
            play: true,
        });
        if (!document.getElementById('video-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'video-overlay';
            document.body.appendChild(overlay);
        }
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
        let body = (data.body||'').replace(/undefined \/ undefined|\/ undefined|undefined \//g, '');

        const date = Date.parse(data.publish_date) && intl.formatDate(
            data.publish_date,
            {
                month: 'long',
                day: '2-digit'
            }
        )

        return (
            <div>
                <h1>
                    {data.title}
                </h1>
                <div className="inner-about__date">
                    {Date.parse(data.publish_date)
                        ? <FormattedRelative value={data.publish_date} />
                        : null
                    }
                </div>
                <div
                    role="button"
                    onClick={e => this.stop(e)}
                    className={classNames(
                        'text-bg-gray',
                        'text-bg-gray--news',
                        'inner-about__text-bg-gray',
                        'broadcast__text-bg-gray',
                        {
                            'inner-about__text-bg-gray_playy': this.state.play,
                        },
                    )}
                >
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
                    <Socials shareLink={'http://news.rtvi.com/broadcast/' + data.id} title={data.title}/>
                </div>
                <div className="inner-about__content">
                    <div dangerouslySetInnerHTML={{ __html: body }} />
                    {children}
                </div>
            </div>
        )
    }
}

export default injectIntl(Content)
