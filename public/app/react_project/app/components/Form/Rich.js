import React, { PureComponent } from 'react'
import styled from 'styled-components'
import ReactQuill from 'react-quill'

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
        ]
    }
};

function Rich(props) {
    return (
        <ReactQuill
            {...props}
            modules={modules} />
    )
}

export default Rich
