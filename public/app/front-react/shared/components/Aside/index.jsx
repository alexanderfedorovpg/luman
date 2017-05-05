import React from 'react'

import Video from 'components/GeneralVideo'
import One from 'components/Broadcast/One'

function Aside({news, video}) {

    return (
        <div className="right-col">
            <Video className="general-news__general-video"  />
            <One className="general-news__enter-one" data={video[0]}/>
        </div>
    )
}

export default Aside;
