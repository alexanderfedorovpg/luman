import React from 'react'

import Item from './Item'

import {
    Root,
    Pic,
    Input,
    Delete
} from './style'

function ImageGallery({ data, onSave, onDelete }) {

    return null
    return (
        <Root>
            {data.map(v => (
                <Item
                    key={v.id}
                    form={`image-gallery-form-${v.id}`}
                    data={v}
                    onSubmit={onSave}
                    onDelete={onDelete} />
            ))}
            <Item
                form={`image-gallery-form-new`}
                data={{}}
                onSubmit={onSave} />
        </Root>
    )
}

export default ImageGallery
