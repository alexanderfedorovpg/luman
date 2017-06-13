import React from 'react'
import Content from './Content'

import './main.css'
import './style.css'

const NewsDetail = ({data, hasVideo}) => {

    return (
        <div className="inner-wrapper">
            <div className="inner-about inner-wrapper inner-default">
                <div className="inner-about__container container">
                    <div className="left left-col left-col_position_relative">
                        <Content hasVideo={hasVideo} data={data}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsDetail;
