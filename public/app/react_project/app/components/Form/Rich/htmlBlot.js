
export default Quill => {
    const {Embed} = Quill.import('parchment');

    const ATTRIBUTES = [
        'alt',
        'height',
        'width'
    ];

    if (Embed.name == 'Html') return

    class Html extends Embed {
        static create(value) {
            let node = document.createElement('div');
            node.innerHTML = value;
            return node;
        }

        static formats(domNode) {
            console.log('domNode',domNode);
            return ATTRIBUTES.reduce(function (formats, attribute) {
                if (domNode.hasAttribute(attribute)) {
                    formats[attribute] = domNode.getAttribute(attribute);
                }
                return formats;
            }, {});
        }

        static value(domNode) {
            return '343434343434343434343434';
        }

        format(name, value) {
            console.log('name, value',name, value);
            if (ATTRIBUTES.indexOf(name) > -1) {
                if (value) {
                    this.domNode.setAttribute(name, value);
                } else {
                    this.domNode.removeAttribute(name);
                }
            } else {
                super.format(name, value);
            }
        }
    }
    Html.blotName = 'html';
    Html.tagName = 'DIV';
    Quill.register('formats/html', Html, true)
}

