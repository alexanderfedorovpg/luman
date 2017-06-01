export default Quill => {
    const ImageBlot = Quill.import('formats/image')

    if (ImageBlot.name == 'ExtImage') return

    class ExtImage extends ImageBlot {

        static create(value) {
            let node = super.create(value);
            let info = document.createElement('figcaption')
            info.classList.add('photo__info')
            let title = document.createElement('figcaption')
            title.classList.add('photo__title')

            if (node.nodeName.toLowerCase() == 'img') {
                let figure = document.createElement('figure')

                node.setAttribute('src', this.sanitize(value.src));
                if (value.title) {
                    node.setAttribute('alt', value.title);
                    node.setAttribute('title', value.title);
                }

                figure.appendChild(node)
                figure.appendChild(title)
                figure.appendChild(info)
                info.textContent = value.title
                info.textContent = `Фото: ${value.author} / ${value.source}`

                figure.dataset.title = value.title;
                figure.dataset.author = value.author;
                figure.dataset.source = value.source;

                node = figure
            }
            else {
                let img = document.createElement('img')
                img.setAttribute('src', this.sanitize(value.src));
                if (value.title) {
                    img.setAttribute('alt', value.title);
                    img.setAttribute('title', value.title);
                }

                node.appendChild(img);

                node.appendChild(title)
                title.textContent = value.title

                node.appendChild(info)
                info.textContent = `Фото: ${value.author} / ${value.source}`

                node.dataset.title = value.title;
                node.dataset.author = value.author;
                node.dataset.source = value.source;
            }

            node.classList.add('photo')

            return node;
        }

        static value(domNode) {
            const img = domNode.nodeName.toLowerCase() == 'img'
                ? domNode
                : domNode.querySelector('img')

            return {
                src: img.getAttribute('src'),
                title: domNode.dataset.title,
                author: domNode.dataset.author,
                source: domNode.dataset.source,
            };
        }
    }
    ExtImage.tagName = 'FIGURE';

    Quill.register('formats/image', ExtImage, true)
}
