import React from 'react';
import classNames from 'classnames';

import Img from 'components/Img';
import { ensureAbs } from 'shared/utils/uri';


import './style.scss';
import placeholder from './instead_video.jpg';

function Video({ data, play, onPlay, playTitle, title, left, collapsed, className }) {
    let playText;

    if (!data) {
        return (
            <div className="general-video general-video_no-overlay">
                <img className="general-video__img" src={placeholder} alt="" />
            </div>
        );
    }

    switch (playTitle) {
        case 'date':
            playText = '27 марта';
            break;

        case 'duration':
        default:
            playText = data.duration ? String(data.duration).replace('.', ':') : 'Смотреть';
    }

    return (
        <div
            className={classNames(
                'general-video',
                className,
                {
                    'general-video_play': play,
                    'general-video_left': left,
                    'general-video_collapsed': collapsed,
                },
            )}
        >
            {
                play ?
                    <video id="videoStream" style={{width: 100 + '%', height: 100 + '%'}} controls="controls" src={ensureAbs(data.url)} autoPlay />

                    :
                    (
                        <span>
                            <a onClick={onPlay} className="general-video__link" />
                            <Img className="general-video__img" src={data.preview} alt="" />
                            {data.url ?

                                <img onClick={onPlay} className="general-video__ico" src="/content/video-ico/video-ico-big.svg" alt="" role="presentation" />
                                :
                                <img className="general-video__ico" src="/content/video-ico/video-ico-big.svg" alt="" role="presentation" />
                            }
                            <div className="general-video__info">
                                <div className="general-video__date general-video__date general-video__date_position">
                                    <span className="general-video__span">{playText}</span>
                                </div>
                                <div className="general-video__title">
                                    {title}
                                </div>
                                <div className="general-video__logo">
                                    <span className="general-video__logo-title">
                                        {left
                                            ? 'News'
                                            : 'Today'
                                        }
                                    </span>
                                </div>
                            </div>
                        </span>
                    )
            }
        </div>
    );
}

export default Video;
