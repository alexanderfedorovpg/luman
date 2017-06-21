import React from 'react';
import classNames from 'classnames';

import { links } from './constants';
import subscribe from './imgs/subscribe.png';
import './style.scss';

function renderLink(link) {
    return (
        <a
            key={link.href}
            href={link.href}
            target="_blank"
            className="subscribe-networks__ico-link"
        >
            <span className={'subscribe-networks__ico-image subscribe-networks__ico-image_' + link.title}></span>
        </a>
    );
}

const Subscribe = ({images, url, className, defaultUrl}) => {
    return (
        <div className={classNames('subscribe', className)}>
            <a className="subscribe__link" href={url || defaultUrl}>
                <img className="subscribe__img" src={images ? images.mobile : subscribe} alt="" role="presentation"/>
            </a>
            <div className="subscribe__container">
                <div className="subscribe-networks subscribe__subscribe-networks">
                    <div className="subscribe-networks__list-network">
                        {links.map(renderLink)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscribe;
