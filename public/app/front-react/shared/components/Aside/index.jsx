import React from 'react'
import classNames from 'classnames'
import MediaQuery from 'react-responsive'

import Video from './Video'
import Noise from 'components/Noise'
import FromEnter from 'components/Broadcast/One'
import Banner from 'components/Banner'
import MiniNews from 'components/MiniNews'
import Group from 'components/Group'
import Block from 'components/Block'
import AsideVideo from 'components/GeneralVideo/AsideVideo'

import efirPlaceholder from './efir.jpg'
import './style.scss';

function Aside({ noise, broadcast, top, topBig, className, now, inside, broadcastPage }) {
    const showBroadcast = !!broadcast && !!broadcast.length;
    const showNoise = !!noise && !!noise.length;
    const showTop = !!top && !!top.length;
    const isInside = !!inside && inside;

    return (
        <div className={classNames('right-col', className)}>
            <MediaQuery minWidth="930px">
                {
                    !broadcastPage &&
                    <div className="aside__video">
                        <AsideVideo
                            playTitle="date"
                            title="Все ключевые события этого дня"
                            videos={now}
                            className="general-news__general-video general-video_idx"
                        />
                    </div>
                }
                {
                    showTop &&
                    <Group title="Главные новости" margin>
                        {
                            topBig &&
                            <Block data={top[0]} />
                        }
                        {top.map((v, ind) => {
                            if (ind === 0) {
                                return null;
                            }

                            return <MiniNews key={v.id} data={v} className="aside__mini-news" />
                        })}
                    </Group>
                }
            </MediaQuery>
            {
                showNoise &&
                <Noise data={noise} />
            }
            {
                !isInside && showBroadcast &&
                <FromEnter data={broadcast} />
                {/* <Subscribe className="news-top__subscribe" /> */}
            }
            {!isInside ?
                <Banner type="subscribe" className="news-top__subscribe" />
                :
                null
            }
            <MediaQuery minDeviceWidth="930px" maxDeviceWidth="1249px">
                <Banner type="large" className="news-top__banner" />
            </MediaQuery>
        </div>
    )
}

Aside.defaultProps = {
    topBig: true,
};

export default Aside
