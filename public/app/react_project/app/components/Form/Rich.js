import React, { PureComponent } from 'react'
import styled from 'styled-components'
import ReactQuill, { Quill } from 'react-quill'
// import Emitter from 'quill/core/emitter'
// import Delta from 'quill-delta'

import 'quill/dist/quill.snow.css'

const modules = {
    toolbar: {
        container: [
            [
                { 'header': [1, 2, 3, 4, 5, 6, false] },
                'bold',
                'italic',
                'underline',
                'link',
            ],
            [
                { 'list': 'ordered' },
                { 'list': 'bullet' },
            ],
            [
                'image',
                'video'
            ],
            [
                'clean'
            ]
        ],
        handlers: {
            // image: function (value) {
            //     let fileInput = this.container.querySelector('input.ql-image[type=file]');
            //     if (fileInput == null) {
            //         fileInput = document.createElement('input');
            //         fileInput.setAttribute('type', 'file');
            //         fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon, image/svg+xml');
            //         fileInput.classList.add('ql-image');
            //         fileInput.addEventListener('change', () => {
            //           if (fileInput.files != null && fileInput.files[0] != null) {
            //             imageHandler(fileInput.files[0], (result) => {
            //             // let reader = new FileReader();
            //             // reader.onload = (e) => {
            //               let range = this.quill.getSelection(true);
            //               this.quill.updateContents(new Delta()
            //                 .retain(range.index)
            //                 .delete(range.length)
            //                 .insert({ image: result })
            //               , Emitter.sources.USER);
            //               fileInput.value = '';
            //             });
            //             // reader.readAsDataURL(fileInput.files[0]);
            //           }
            //         });
            //         this.container.appendChild(fileInput);
            //     }
            //     fileInput.click();
            // }
        }
    },
};

function imageHandler(image, callback) {
    let reader = new FileReader();
    reader.onload = (e) => callback(e.target.result);
    reader.readAsDataURL(image);
}

function Rich(props) {
    return (
        <ReactQuill
            {...props}
            modules={modules} />
    )
}

export default Rich
