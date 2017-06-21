import React, {PureComponent} from 'react';
import classNames from 'classnames'
import ScissorsIcon from 'components/Icon/Scissors';
import {FormattedRelative} from 'react-intl';
import {replaceStrToLink} from 'shared/utils/uri';
import renderSocialWidgets from './renderSocialWidgets'
import FormatDate from 'components/FormatDate';

import Socials from 'components/Socials';
import Rubrics from 'components/Rubrics';
import Img from 'components/Img';

class Content extends PureComponent {
    replaceWidgets() {
        if (this._timer) clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            renderSocialWidgets()
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
        let body = (data.body||'').replace(/undefined \/ undefined|\/ undefined|undefined \//g, '');
        body = replaceStrToLink(body);
        return (
            <div>
                <h1>{data.title}</h1>
                <div className="inner-about__date">
                    <FormatDate value={data.created_at}/>
                </div>
                <div
                    className={classNames('text-bg-gray text-bg-gray--news inner-about__text-bg-gray', {'inner-scissors': data.top < 6})}>
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
                                    <div key={i}
                                         dangerouslySetInnerHTML={{__html: replaceStrToLink(v)}}
                                         className="text-bg-gray__text text-bg-gray__text-lite"
                                    />
                                ))}
                            </div>
                        )
                    }
                    <div className="news-preview news-preview--wide">
                        <Rubrics data={data.rubrics}/>
                        <figure className="news-preview__img">
                            <Img
                                src={image.url}
                                title={image.object_name || ''}
                                alt={image.object_name || ''}
                            />
                            {image.object_author && image.object_source
                            && (
                                <figcaption className="news-preview__source"
                                            dangerouslySetInnerHTML={{__html: replaceStrToLink(`Фото: ${image.object_author} / ${image.object_source}`)}}
                                />
                            )
                            }
                        </figure>
                        <p className="news-preview__text"
                           dangerouslySetInnerHTML={{__html: replaceStrToLink(data.sub_title)}}
                        />
                    </div>
                    <Socials shareLink={data.uri} title={data.title}/>
                </div>
                <div className="inner-about__content">
                    <div dangerouslySetInnerHTML={{__html: body}}/>
                    {children}
                </div>
            </div>
        );
    }
}

export default Content;
