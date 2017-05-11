import React from 'react'
import classNames from 'classnames'

import './style.scss'

import vk from './imgs/vkk.png'
import fb from './imgs/fb.png'
import tw from './imgs/tw.png'
import ok from './imgs/okk.png'

function Subscribe({ className }) {

    return (
        <div className={classNames('subscribe', className)}>
            <a className="subscribe__link" href="javascript:void(0)">
                <img className="subscribe__img" src="/content/subscribe/subscribe.png" alt="" role="presentation" />
            </a>
            <div className="subscribe__container">
                <div className="subscribe-networks subscribe__subscribe-networks">
                    <div className="subscribe-networks__list-network">
                        <a href="#" className="subscribe-networks__ico-link">
                            <img src={fb} alt="" className="subscribe-networks__ico-image"/>
                        </a>
                        <a href="#" className="subscribe-networks__ico-link">
                            <img src={tw} alt="" className="subscribe-networks__ico-image"/>
                        </a>
                        <a href="#" className="subscribe-networks__ico-link">
                            <img src={ok} alt="" className="subscribe-networks__ico-image"/>
                        </a>
                        <a href="#" className="subscribe-networks__ico-link">
                            <img src={vk} alt="" className="subscribe-networks__ico-image"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscribe
