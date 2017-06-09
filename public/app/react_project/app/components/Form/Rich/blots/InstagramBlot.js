import React from 'react';
import ReactDOM from 'react-dom';
import InstagramEmbed from 'react-instagram-embed';

export default Quill => {
    let BlockEmbed = Quill.import('blots/block/embed');
    class InstagramBlot extends BlockEmbed {
        static create(href) {
            let node = super.create();
            node.dataset.href = href;
            let embedNode = <div><InstagramEmbed maxWidth={500} url={href}/></div>;
            if(embedNode){
                ReactDOM.render(embedNode, node)
                return node;
            }
        }

        static value(domNode) {
            return domNode.dataset.href;
        }
    }
    InstagramBlot.blotName = 'instagram';
    InstagramBlot.tagName = 'div';
    InstagramBlot.className = 'instagram-embed';
    Quill.register(InstagramBlot);
}

