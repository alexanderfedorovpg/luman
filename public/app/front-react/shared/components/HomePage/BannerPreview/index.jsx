import React from 'react'
import classNames from 'classnames'

import './style.scss'

function BannerPreview({ className }) {

    return (
        <div className={classNames('banner-preview', className)}>
            <picture>
                <source srcSet="/content/banner/banner-tablet-landscape.png" media="(max-width: 1559px)"/>
                <source srcSet="/content/banner/banner.png" media="(min-width: 1600px)"/>
                <img src="/content/banner/banner.png" alt="" role="presentation"/>
            </picture>
        </div>
    )
}


export default BannerPreview
