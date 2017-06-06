import React from 'react'

import Video from 'components/GeneralVideo'
import OneVideo from 'components/Broadcast/One'
import Noise from 'components/Noise'
import Related from 'components/RelatedNews'
import Content from './Content'
import Aside from 'containers/Aside'

import './style.scss'

function Detail({ data, noise, related, broadcast, hasVideo }) {

    return (
        <div className="inner-wrapper">
            <div className="inner-about inner-wrapper inner-default">
                <div className="inner-about__container container">
                    <div className="left left-col left-col_position_relative">
                        <Content hasVideo={hasVideo} data={data}>
                            <Related data={related} />
                        </Content>
                    </div>
                    <Aside />
                </div>
            </div>
        </div>
    )
}

export default Detail
