import React, { Component } from 'react'

import Title from 'components/Title'
import Group from 'components/Group'
import Video from 'components/Aside/Video'
import MiniNews from 'components/MiniNews'

import './stub.scss'

class Broadcast extends Component {

    render() {
        const { nowNews } = this.props

        return (
            <div className="inner-wrapper">
                <div className="news-top">
                    <div className="news-top__container container">
                        <div className="news-top__left left-col left-col left-col_width_inner">
                            <Title className="news-top__margin-top-bottom">
                                Из эфира
                            </Title>
                            <img style={{height: '615px'}} src={this.props.stubImage}/>
                        </div>
                        <div className="right-col">
                            <Video data={{}} />
                            <Group title="Главные новости" margin>
                                {nowNews.map(v => (
                                    <MiniNews key={v.id} data={v} className="broadcast__mini-news" />
                                ))}
                            </Group>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Broadcast