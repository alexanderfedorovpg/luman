export default Quill => {
    const EmbedBlot = Quill.import('blots/embed')

    class ExtVideo extends EmbedBlot {

        static create(value) {
            let node = super.create(value);

            let info = document.createElement('figcaption');
            info.classList.add('video__info');
            if (value.author || value.source) {
                const divider = value.author && value.source ? ' / ' : '';
                info.textContent = `Видео: ${value.author||''}${divider}${value.source||''}`;
            }

            let title = document.createElement('figcaption');
            title.classList.add('video__title');
            title.textContent = value.title

            let image = document.createElement('img');
            image.setAttribute('src', `${process.env.API_ENDPOINT_PUBLIC}/image/instead_video`);
            image.classList.add('video__preview');

            node.dataset.src = value.src;
            node.dataset.title = value.title;
            node.dataset.author = value.author;
            node.dataset.source = value.source;

            node.appendChild(image);
            node.appendChild(title);
            node.appendChild(info);

            return node;
        }

        static value(domNode) {

            return {
                src: domNode.dataset.src,
                title: domNode.dataset.title,
                author: domNode.dataset.author,
                source: domNode.dataset.source,
            };
        }
    }
    ExtVideo.blotName = 'ext-video';
    ExtVideo.tagName = 'FIGURE';
    ExtVideo.className = 'video';

    Quill.register(ExtVideo)
}