import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Noise from 'components/Noise'
import Group from 'components/Group'
import Block from 'components/Block'
import MiniNews from 'components/MiniNews'
import Related from 'components/RelatedNews'
import Content from './Content'
import Video from 'components/Aside/Video'
import Aside from 'containers/Aside'

import './style.scss'

function Detail({ data, noise, now, related, broadcast, hasVideo, noisePage, match }) {
    const isNoise = !!noisePage && noisePage;

    const id = (m => m && +m[0])((match.params.code||'').match(/^\d+/));
    const filteredNow = now.filter(v => (
        v.id !== id
    ));
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
                            <Block data={filteredNow[0]} />
                            {filteredNow.slice(1, 5).map(v => (
                                <MiniNews key={v.id} data={v} className="info-noize__mini-news" />
                            ))}
                        </Group>
                    </div>
                </div>
            </div>
        </div>
    )
}

Detail.propTypes = {
    now: PropTypes.array
}

export default withRouter(Detail)
