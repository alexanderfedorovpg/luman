import React, { PureComponent } from 'react'
import { reduxForm, Field } from 'redux-form/immutable'

import Button from 'components/Button'
import {
    Item as Root,
    Pic,
    Input,
    ImageLoader,
    Delete
} from './style'

class Item extends PureComponent {

    componentDidMount() {
        const { data, initialize } = this.props

        initialize({
            title: data.title,
            image: data.url,
            author: data.author,
            source: data.source,
            id: data.id,
        })
    }

    render() {
        const { data, onDelete, handleSubmit, dirty } = this.props

        return (
            <Root>
                {onDelete
                    && data.id
                    && <Delete onClick={onDelete.bind(this, data.id)} />
                }
                <Field
                    accept="image/*"
                    name="image"
                    component={ImageLoader} />

                <Field
                    placeholder="Название"
                    name="title"
                    component={Input} />

                <Field
                    placeholder="Автор"
                    name="author"
                    component={Input} />

                <Field
                    placeholder="Источник"
                    name="source"
                    component={Input} />

                <Field
                    type="hidden"
                    name="id"
                    component={Input} />

                <Button block onClick={dirty && handleSubmit}>
                    Сохранить
                </Button>
            </Root>
        )
    }
}

export default reduxForm({
    validate: values => {
        const errors = {};

        if (!values.get('image')) {
            errors.image = 'Не выбрано изображение';
        }

        return errors;
    }
})(Item)
