import React from 'react';
import ReactDOM from 'react-dom';
import FacebookProvider, { EmbeddedPost } from 'react-facebook';

export default Quill => {
    let BlockEmbed = Quill.import('blots/block/embed');
    class FacebookBlot extends BlockEmbed {
        static create(href) {
            let node = super.create();
            node.dataset.href = href;
            let value = href.match(/^(https?):\/\/(www\.)?facebook\.com\/(.+)\/posts\/([a-zA-Z0-9_-]+)/);
            let appId = `${value[3]}_${value[4]}`

            let embedNode =
                <FacebookProvider appId={appId}>
                    <EmbeddedPost href={href} onParse={(res) => {
                        res.then((result)=>(console.log(result)))
                    }} width="500"/>
                </FacebookProvider>
            ReactDOM.render(embedNode, node)
            return node;
        }
        static value(domNode) {
            return domNode.dataset.href;
        }
    }
    FacebookBlot.blotName = 'facebook';
    FacebookBlot.tagName = 'div';
    FacebookBlot.className = 'facebook-embed';
    Quill.register(FacebookBlot);
}
