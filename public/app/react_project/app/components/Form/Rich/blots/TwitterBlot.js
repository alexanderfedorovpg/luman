import React from 'react';
import ReactDOM from 'react-dom';
import TweetEmbed from 'react-tweet-embed'

export default Quill => {
    let BlockEmbed = Quill.import('blots/block/embed');
    class TwitterBlot extends BlockEmbed {
        static create(id) {
            let node = super.create();
            node.dataset.id = id;
            let embedNode = <TweetEmbed id={id}/>;
            if(embedNode){
                ReactDOM.render(embedNode, node)
            }
            return node;

        }
        static value(domNode) {
            return domNode.dataset.id;
        }
        format(name, value) {
            super.format(name, value);
        }
    }
    TwitterBlot.blotName = 'twitter';
    TwitterBlot.tagName = 'div';
    TwitterBlot.className = 'twitter-embed';
    Quill.register(TwitterBlot);
}

