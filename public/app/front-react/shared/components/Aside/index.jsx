import React from 'react'
import classNames from 'classnames'
import MediaQuery from 'react-responsive'

import Video from './Video'
import Noise from 'components/Noise'
import FromEnter from 'components/Broadcast/One'
import Subscribe from 'components/Subscribe'
import Banner from 'components/HomePage/Banner'
import MiniNews from 'components/MiniNews'
import Group from 'components/Group'
import Block from 'components/Block'
import AsideVideo from 'components/GeneralVideo/AsideVideo'

import efirPlaceholder from './efir.jpg'
import './style.scss';

function Aside({ noise, broadcast, top, className, now, inside, noisePage }) {
    const showBroadcast = !!broadcast && !!broadcast.length;
    const showNoise = !!noise && !!noise.length;
    const showTop = !!top && !!top.length;
    const broadcastVideos = showBroadcast ? broadcast.slice(1) : [];
    const isInside = !!inside && inside;
    const isNoise = !!noisePage && noisePage;

    return (
        <div className={classNames('right-col', className)}>
            {
                showBroadcast &&
                <Video data={broadcast[0]} />
            }
            {
                showNoise &&
                <Noise data={noise} />
            }
            <MediaQuery minWidth="930px">
                <div className="aside__video" style={{height: '396px'}}>
                    {!isNoise ?
                        <AsideVideo
                            playTitle="date"
                            title="Все ключевые события этого дня"
                            videos={now}
                            className="general-news__general-video general-video_idx" />
                        :
                        null
                    }
                </div>
                {
                    showTop &&
                    <Group title="Главные новости" margin>
                        <Block data={top[0]} />
                        {top.map((v, ind) => {
                            if (ind === 0) {
                                return null;
                            }
                            return <MiniNews key={v.id} data={v} className="aside__mini-news" />
                        })}
                    </Group>
                }
            </MediaQuery>
            {!isInside ?
                (
                    <div>
                        {
                            (showBroadcast && broadcastVideos.length)
                            ? <FromEnter data={broadcastVideos} />
                            : <img src={efirPlaceholder} className="from-enter enter-one" alt="" />
                        }
                        <Subscribe className="news-top__subscribe" />
                    </div>
                )
                :
                null
            }
            <MediaQuery minDeviceWidth="930px" maxDeviceWidth="1249px">
                <Banner className="news-top__banner" />
            </MediaQuery>
        </div>
    )
}

export default Aside
