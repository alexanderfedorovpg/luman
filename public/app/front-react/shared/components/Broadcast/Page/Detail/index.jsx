import React from 'react'

import Content from './Content'
import Video from 'components/Aside/Video'
import Group from 'components/Group'
import Block from 'components/Block'
import RelatedNews from 'components/RelatedNews'
import MiniNews from 'components/MiniNews'
import Banner from 'components/Banner'
import Aside from 'containers/Aside'

import './style.scss'

function Detail({ data, nowNews, relatedNews }) {
    const now = nowNews;
    return (
        <div className="inner-wrapper broadcast_detail">
            <div className="inner-about inner-wrapper inner-default">
                <div className="inner-about__container container">
                    <div className="left left-col left-col_position_relative">
                        <Content data={data}>
                            <RelatedNews data={relatedNews} title="Из эфира по теме" />
                        </Content>
                    </div>
                    <div className="general-news__right right-col">
                        <Aside now={nowNews} noise={null} broadcast={null} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
