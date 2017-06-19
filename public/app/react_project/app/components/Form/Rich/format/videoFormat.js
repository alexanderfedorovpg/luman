export default Quill => {
    const EmbedBlot = Quill.import('blots/embed')

    class ExtVideo extends EmbedBlot {

        static create(value) {
            let node = super.create(value);

            let wrapper = document.createElement('div');
            wrapper.classList.add('video__preview-wrapper');

            let playBtn = document.createElement('div');
            playBtn.classList.add('video__play');

            let logo = document.createElement('div');
            logo.classList.add('video__logo');
            logo.textContent = 'news';

            let info = document.createElement('figcaption');
            info.classList.add('video__info');
            if (value.author || value.source) {
                const divider = value.author && value.source ? ' / ' : '';
                info.textContent = `Видео: ${value.author||''}${divider}${value.source||''}`;
            }

            let title = document.createElement('figcaption');
            title.classList.add('video__title');
            title.textContent = value.title

            let preview = document.createElement('img');
            preview.setAttribute('src', value.preview_src || `${process.env.API_ENDPOINT_PUBLIC}/image/instead_video`);
            preview.classList.add('video__preview');

            node.dataset.src = value.src;
            node.dataset.title = value.title||'';
            node.dataset.author = value.author||'';
            node.dataset.source = value.source||'';

            wrapper.appendChild(preview);
            wrapper.appendChild(playBtn);
            wrapper.appendChild(logo);
            node.appendChild(wrapper);
            node.appendChild(title);
            node.appendChild(info);

            return node;
        }

        static value(domNode) {
            const preview = domNode.querySelector('img')

            return {
                preview_src: preview.getAttribute('src'),
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
