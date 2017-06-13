import ReactDOM from 'react-dom';
import React from 'react'

import FacebookProvider, { EmbeddedPost } from 'react-facebook';
import TweetEmbed from 'react-tweet-embed'
import InstagramEmbed from 'react-instagram-embed';

const renderTweeter = (el, width)=>{
    var tags = el.getElementsByClassName('twitter-embed');
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

const renderFacebook = (el, width) => {
    let tags = el.getElementsByClassName('facebook-embed');
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

const renderInstagram = (el, width) => {
    let tags = el.getElementsByClassName('instagram-embed');
    for (let i = 0; i < tags.length; i++) {
        let item = tags[i];
        let href = item.dataset.href;
        if (href) {
            item.dataset.href = '';
            ReactDOM.render(<InstagramEmbed maxWidth={width} url={href}/>, item);
        }
    }
}

const renderVideo = (el, width) => {
    let tags = el.getElementsByClassName('ql-video');
    for (let i = 0; i < tags.length; i++) {
        let item = tags[i];
        if (width < 500) {
            item.style.width = width + 'px';
            item.style.height = '';
        }
    }
}

const replaceSocialEmbed = () => {
    let el = document.getElementsByClassName('inner-about__content')[0];
    let widthBlock = el.children[0].offsetWidth;
    if(widthBlock >= 500) widthBlock = 500;
    renderTweeter(el, widthBlock);
    renderFacebook(el, widthBlock);
    renderInstagram(el, widthBlock);
    renderVideo(el, widthBlock);
}

export default replaceSocialEmbed;