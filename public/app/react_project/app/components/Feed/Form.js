import React, { Component } from 'react'

import Tags from './../Tags'
import Rating from './../Rating'
import Icon from './../Icon'
import Button from './../Button'
import {
    Input,
    InputIcon,
    Group,
    Textarea,
    Label,
    Select
} from './../Form'

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: {

            }
        }

        this.submitHandler = this.submitHandler.bind(this)
    }

    setError(prop, value) {

        this.setState({
            error: {
                ...this.state.error,
                [prop]: value
            }
        })
    }

    submitHandler(e) {
        e.preventDefault()

        let form = new FormData(e.target)

        if (!form.get('title')) {
            this.setError('title', true)
            return
        }
        else {
            this.setError('title', false)
        }

        this.props.onSubmit({
            title: form.get('title'),
            tags: form.getAll('tags'),
            rating: form.get('rating'),
            editor: form.get('editor'),
            keywords: form.get('keywords').split(' ').slice(0, 4),

            id: this.props.data.id
        })
    }

    render() {
        let { data, users } = this.props

        return (
            <form onSubmit={this.submitHandler}>
                <Tags data={(data.tags || "").split(', ')} />
                <Rating value={5} />
                <Group>
                    <Textarea
                        defaultValue={data.header}
                        style={{ minHeight: '150px' }}
                        name="title"
                        error={this.state.error.title}
                        block />
                </Group>
                <Group sm>
                    <Label bold>Назначить редактора статьи</Label>
                    <Select icon="search" options={users} name="editor" />
                </Group>
                <Group sm>
                    <Label bold>Назначить редактора в прямой эфир</Label>
                    <Select icon="search" options={users} />
                </Group>
                <Group sm>
                    <Label bold>Собрать команду для съемки сюжета</Label>
                    <Select icon="search" options={users} />
                </Group>
                <Group>
                    <Label light right>Не более 4 слов через пробел</Label>
                    <Input name="keywords" block placeholder="Ключевые слова" />
                </Group>
                <Group>
                    <InputIcon icon="clip" name="comment" block placeholder="Комментарий" />
                </Group>
                <Group>
                    <Button block success>
                        Отправить в работу
                    </Button>
                </Group>
            </form>
        )
    }
}

export default Form
