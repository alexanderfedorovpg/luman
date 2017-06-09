/**
 * Created by Frimko on 09.06.2017.
 * mailto ccc-car@yandex.ru.
 */
import ReactDOM from 'react-dom';
import React from 'react'

import FacebookProvider, { EmbeddedPost } from 'react-facebook';
import TweetEmbed from 'react-tweet-embed'
import InstagramEmbed from 'react-instagram-embed';

const renderTweeter = (width)=>{
    var tags = document.getElementsByClassName('twitter-embed');
    for (let i = 0; i < tags.length; i++) {
        let item = tags[i];
        let id = item.dataset.id;
        item.dataset.id = '';
        if (id) {
            item.innerHTML = '';
            ReactDOM.render(<TweetEmbed id={id} options={{width:width}}/>, item)
        }
    }
}

const renderFacebook = (width) => {
    let tags = document.getElementsByClassName('facebook-embed');
    for (let i = 0; i < tags.length; i++) {
        let item = tags[i];
        let href = item.dataset.href;
        if (href) {
            let value = href.match(/^(https?):\/\/(www\.)?facebook\.com\/(.+)\/posts\/([a-zA-Z0-9_-]+)/);
            let appId = `${value[3]}_${value[4]}`
            item.dataset.href = '';
            ReactDOM.render(
                <FacebookProvider appId={appId}>
                    <EmbeddedPost href={href} width={width}/>
                </FacebookProvider>,
                item
            );
        }
    }
}

const renderInstagram = (width) => {
    let tags = document.getElementsByClassName('instagram-embed');
    for (let i = 0; i < tags.length; i++) {
        let item = tags[i];
        let href = item.dataset.href;
        if (href) {
            item.dataset.href = '';
            ReactDOM.render(<InstagramEmbed maxWidth={width} url={href}/>, item);
        }
    }
}

const replaceSocialEmbed = () => {
    let widthBlock = document.getElementsByClassName('inner-about__content')[0].children[0].offsetWidth;
    if(widthBlock >= 500) widthBlock = 300;
    renderTweeter(widthBlock);
    renderFacebook(widthBlock);
    renderInstagram(widthBlock);
}

export default replaceSocialEmbed;