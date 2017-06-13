export default Quill => {
    let BlockEmbed = Quill.import('blots/block/embed');
    class HtmlBlot extends BlockEmbed {
        static create(html) {
            let node = super.create();
            node.innerHTML = html;
            return node;
        }
        static value(domNode) {
            return domNode.innerHTML;
        }
    }
    HtmlBlot.blotName = 'html';
    HtmlBlot.tagName = 'div';
    HtmlBlot.className = 'html-embed';
    Quill.register(HtmlBlot);
}

