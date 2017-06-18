import React from 'react'
import PropTypes from 'prop-types'

import Noise from 'components/Noise'
import Group from 'components/Group'
import Block from 'components/Block'
import MiniNews from 'components/MiniNews'
import Related from 'components/RelatedNews'
import Content from './Content'
import Video from 'components/Aside/Video'
import Aside from 'containers/Aside'

import './style.scss'

function Detail({ data, noise, now, related, broadcast, hasVideo, noisePage }) {
    const firstVideo = now[0] || {}
    const isNoise = !!noisePage && noisePage;
    return (
        <div className="inner-wrapper news-detail">
            <div className="inner-about inner-wrapper inner-default">
                <div className="inner-about__container container">
                    <div className="left left-col left-col_position_relative">
                        <Content hasVideo={hasVideo} data={data}>
                            <Related data={related} />
                        </Content>
                    </div>
                    <div className="right-col">
                        <Aside noise={null} broadcast={null} top={null} now={now} inside={true} noisePage={isNoise}/>
                        <Group title="Главные новости" margin>
                            <Block data={now[0]} />
                            {now.slice(1, 5).map(v => (
                                <MiniNews key={v.id} data={v} className="info-noize__mini-news" />
                            ))}
                        </Group>
                        {!isNoise ?
                            <Noise className="info-noize__news-detail" data={noise} />
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

Detail.propTypes = {
    now: PropTypes.array
}

export default Detail
