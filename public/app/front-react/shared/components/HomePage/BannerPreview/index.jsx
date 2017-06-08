import React from 'react'
import classNames from 'classnames'

import './style.scss'

function BannerPreview({ className }) {

    return (
        <div className={classNames('banner-preview', className)}>
            <picture className="banner-preview__picture">
                <source srcSet="/content/banner/banner-mobile.png" media="(max-width: 719px)"/>
                <source srcSet="/content/banner/banner-tablet-landscape.png" media="(max-width: 1559px)"/>
                <source srcSet="/content/banner/banner.png" media="(min-width: 1600px)"/>
                <img className="banner-preview__img" src="/content/banner/banner.png" alt="" role="presentation"/>
            </picture>
        </div>
    )
}


export default BannerPreview
