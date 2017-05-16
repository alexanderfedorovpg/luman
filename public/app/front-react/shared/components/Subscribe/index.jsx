import React from 'react';
import classNames from 'classnames';

import { links } from './constants';
import './style.scss';

function renderLink(link) {
    return (
        <a
            key={link.href}
            href={link.href}
            target="_blank"
            className="subscribe-networks__ico-link"
        >
            <img src={link.img} alt="" className="subscribe-networks__ico-image" />
        </a>
    );
}

function Subscribe({ className }) {
    return (
        <div className={classNames('subscribe', className)}>
            <a className="subscribe__link" href="javascript:void(0)">
                <img className="subscribe__img" src="/content/subscribe/subscribe.png" alt="" role="presentation" />
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
