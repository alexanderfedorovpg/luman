import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { FormattedRelative } from 'react-intl'

import Video from 'components/GeneralVideo'
import Rubrics from 'components/Rubrics'

import { ensureAbs } from 'shared/utils/uri'

class Content extends PureComponent {

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
        const { data, children } = this.props
        const theses = Array.isArray(data.theses)
            ? data.theses
            : `${data.theses}`.split('\\')

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
                <div className="text-bg-gray text-bg-gray--news inner-about__text-bg-gray">
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
                    <Video
                        className="general-news__general-video"
                        play={this.state.play}
                        onPlay={this.play}
                        left
                        data={data.video_stream} />
                    <div className="news-preview">
                        <Rubrics data={data.rubrics} />
                        <figure className="news-preview__img">
                            <img src={ensureAbs(data.image_preview)} />
                            <figcaption className="news-preview__source">
                                {/*Фото: Mc_maxim / Twitter*/}
                            </figcaption>
                        </figure>
                        <p className="news-preview__text">
                            {data.sub_title}
                        </p>
                    </div>
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
