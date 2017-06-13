import React from 'react'

import Content from './Content'
import Video from 'components/Aside/Video'
import Group from 'components/Group'
import Block from 'components/Block'
import MiniNews from 'components/MiniNews'
import Subscribe from 'components/Subscribe'
import Aside from 'containers/Aside'

import './style.scss'

function Detail({ data, nowNews }) {
    const now = nowNews;
    return (
        <div className="inner-wrapper broadcast_detail">
            <div className="inner-about inner-wrapper inner-default">
                <div className="inner-about__container container">
                    <div className="left left-col left-col_position_relative">
                        <Content data={data}>
                        </Content>
                    </div>
                    <div className="general-news__right right-col">
                        <Aside noise={null} broadcast={null} now={now} />
                        <Group title="Главные новости" margin>
                            <Block data={nowNews[0]} />
                            {nowNews.slice(1, 5).map(v => (
                                <MiniNews key={v.id} data={v} className="broadcast__mini-news info-noize__mini-news" />
                            ))}
                        </Group>
                        <Subscribe />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
