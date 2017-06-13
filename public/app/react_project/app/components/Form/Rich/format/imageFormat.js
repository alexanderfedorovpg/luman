export default Quill => {
    const EmbedBlot = Quill.import('blots/embed')

    class ExtImage extends EmbedBlot {

        static create(value) {
            let node = super.create(value);
            let info = document.createElement('figcaption')
            info.classList.add('photo__info')
            let title = document.createElement('figcaption')
            title.classList.add('photo__title')

            let img = document.createElement('img')
            img.setAttribute('src', value.src);
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

            return node;
        }

        static value(domNode) {
            const img = domNode.querySelector('img')

            return {
                src: img.getAttribute('src'),
                title: domNode.dataset.title,
                author: domNode.dataset.author,
                source: domNode.dataset.source,
            };
        }
    }
    ExtImage.blotName = 'ext-image';
    ExtImage.tagName = 'FIGURE';
    ExtImage.className = 'photo';

    Quill.register(ExtImage)
}
