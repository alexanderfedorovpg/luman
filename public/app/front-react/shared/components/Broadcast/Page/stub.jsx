import React, { Component } from 'react'
import Title from 'components/Title'
import Aside from 'containers/Aside'

import './style.scss'
import './stub.scss'

class Broadcast extends Component {

    render() {
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
                        <Aside />
                    </div>
                </div>
            </div>
        )
    }
}

export default Broadcast
