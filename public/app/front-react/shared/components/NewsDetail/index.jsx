import React from 'react'

import Video from 'components/GeneralVideo'
import OneVideo from 'components/Broadcast/One'
import Noise from 'components/Noise'
import Related from 'components/RelatedNews'
import Content from './Content'

import './style.scss'

function NoisePage({ data, noise, related, broadcast }) {

    return (
        <div className="inner-wrapper">
            <div className="inner-about inner-wrapper inner-default">
                <div className="inner-about__container container">
                    <div className="inner-about__container container">
                        <div className="left left-col left-col_position_relative">
                            <Content data={data}>
                                <Related data={related} />
                            </Content>
                        </div>
                        <div className="right right-col">
                            <Video className="inner-about__general-video general-video--sm" />
                            <Noise data={noise} className="inner-about__info-noize" />
                            <OneVideo data={broadcast[0]} className="inner-about__enter-one" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoisePage
