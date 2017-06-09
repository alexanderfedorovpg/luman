/**
 * Created by Frimko on 08.06.2017.
 * mailto ccc-car@yandex.ru.
 */
import Delta from 'quill-delta'

/*
* инкостыляция в действии
* */

/**
 * добавления вложения
 *
 * @param url - юрл
 * @param range - число растояния куда вставлять
 * @param cb - callBack()
 */
const addEmbed = (quill, url, range, cb) => {
    url = url.trim().replace(/[\s]+/g, ''); //чистим строку

    //для твитера - https://twitter.com/Interior/status/870349439747198977
    if (url.indexOf("twitter") >= 0) {
        let value = url.match(/^(https?):\/\/(www\.)?twitter\.com\/([a-zA-Z0-9_-]+)\/status\/([a-zA-Z0-9_-]+)/);
        let id = value[4];
        if(id){
            quill.updateContents(
                new Delta()
                    .retain(range)
                    .insert({twitter: id}),
                'api'
            );
        }

        //для ютуба + vimeo - https://www.youtube.com/watch?v=hvxwZy4wGCU&feature=youtu.be&t=1200
    } else if (url.indexOf("youtube") >= 0 || url.indexOf("vimeo") >= 0) {
        let value = url;
        let match = value.match(/^(https?):\/\/(www\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) ||
            value.match(/^(https?):\/\/(www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (match) {
            value = match[1] + '://www.youtube.com/embed/' + match[3] + '?showinfo=0';
        } else if (match = value.match(/^(https?):\/\/(www\.)?vimeo\.com\/(\d+)/)) {  // eslint-disable-line no-cond-assign
            value = match[1] + '://player.vimeo.com/video/' + match[3] + '/';
        }
        quill.updateContents(
            new Delta().retain(range).insert({video: value}),
            'api'
        );

        //для инстаграмма - https://www.instagram.com/p/vcx9GEtsHp/
    } else if (url.indexOf("instagram") >= 0) {
        quill.updateContents(
            new Delta()
                .retain(range)
                .insert({instagram: url}),
            'api'
        );
        //фейсбук - https://www.facebook.com/20531316728/posts/10154009990506729/
    } else if (url.indexOf("facebook") >= 0) {
        quill.updateContents(
            new Delta()
                .retain(range)
                .insert({facebook: url}),
            'api'
        );
    }
    cb();
};

export default addEmbed;