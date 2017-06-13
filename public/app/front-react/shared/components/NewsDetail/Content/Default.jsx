import React, {PureComponent} from 'react';
import classNames from 'classnames'
import ScissorsIcon from 'components/Icon/Scissors';
import {FormattedRelative} from 'react-intl';
import RenderSocialWidgets from './RenderSocialWidgets'
import FormatDate from 'components/FormatDate';

import Socials from 'components/Socials';
import Rubrics from 'components/Rubrics';
import Img from 'components/Img';

class Content extends PureComponent {
    replaceWidgets() {
        if (this._timer) clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            RenderSocialWidgets()
        }, 1000)
    }

    componentDidMount() {
        this.replaceWidgets()
    }

    componentDidUpdate() {
        this.replaceWidgets()
    }

    render() {
        const {data, children} = this.props;
        const image = data.image_main || {};
        let theses = [];

        if (data.theses) {
            theses = Array.isArray(data.theses)
                ? data.theses
                : `${data.theses}`.split('\\');
        }

        if (data.body && data.body.indexOf('/ undefined', '') > -1) {
            data.body = data.body.replace('/ undefined', '');
        }
        if (data.body && data.body.indexOf('undefined /', '') > -1) {
            data.body = data.body.replace('undefined /', '');
        }
        if (data.body && data.body.indexOf('undefined / undefined', '') > -1) {
            data.body = data.body.replace('undefined / undefined', '');
        }

    return (
        <div>
            <h1>{data.title}</h1>
            <div className="inner-about__date">
                {Date.parse(data.publish_date)
                    ? <FormatDate value={data.publish_date} />
                    : null
                }
            </div>
            <div className={classNames('text-bg-gray text-bg-gray--news inner-about__text-bg-gray', {'inner-scissors' : data.top < 6})}>
                { data.top < 6 &&
                    (
                        <div className="scissors scissors_noize">
                            Инфошум
                            <div className="scissors__icon">
                            </div>
                        </div>
                    )
                }
                {
                    !!theses.length &&
                    (
                        <div className="text-bg-gray__block-text active">
                            {theses.map((v, i) => (
                                <div key={i} className="text-bg-gray__text text-bg-gray__text-lite">
                                    {v}
                                </div>
                            ))}
                        </div>
                    )
                }
                <div className="news-preview news-preview--wide">
                    <Rubrics data={data.rubrics} />
                    <figure className="news-preview__img">
                        <Img
                            src={image.url}
                            title={image.object_name || ''}
                            alt={image.object_name || ''}
                        />
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
                    <div dangerouslySetInnerHTML={{__html: data.body}}/>
                    {children}
                </div>
            </div>
        );
    }
}

export default Content;
