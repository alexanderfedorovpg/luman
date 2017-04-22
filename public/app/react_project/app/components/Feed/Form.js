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
            data: {
                header: props.data.header || '',
                rating: props.data.header && 5
            },
            error: {

            }
        }

        this.submitHandler = this.submitHandler.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                data: {
                    ...this.state.data,
                    header: nextProps.data.header,
                    rating: 5
                },
                error: {}
            })
        }
    }

    componentDidMount() {
        if (!this.props.data.tags) {
            this.setError('tags', false);   
        }
    }

    setValue(prop, value) {

        this.setState({
            data: {
                ...this.state.data,
                [prop]: value
            }
        })
    }

    setError(prop, value) {

        this.setState({
            error: {
                ...this.state.error,
                [prop]: value
            }
        })
    }

    validateField(prop, predicate) {
        return predicate(prop)
    }

    validate(form) {

        let errors = {
            header: !this.state.data.header,
            keywords: !form.get('keywords'),
            tags: form.getAll('tags').length < 1,
            editor: !form.get('editor'),
            id: !this.props.data.id
        }

        this.setState({
            error: errors
        })

        return errors
    }

    submitHandler(e) {
        e.preventDefault()

        let form = new FormData(e.target)

        let errors = this.validate(form)
        console.log(errors);
        if (Object.values(errors).reduce((a,b) => a || b, false)) return

        this.props.onSubmit({
            header: this.state.data.header,
            rating: this.state.data.rating,
            tags: form.getAll('tags'),
            editor: form.get('editor'),
            online_editor: form.get('online_editor'),
            video_group: form.get('video_group'),
            keywords: form.get('keywords').split(' ').slice(0, 4),
            comment: form.get('comment'),

            id: this.props.data.id
        })

        this.setState({
            data: {
                header: '',
                rating: null
            }
        })
    }

    render() {
        let { data, users } = this.props

        return (
            <form onSubmit={this.submitHandler}>
                <Tags data={(data.tags || "").split(', ')} />
                <Rating
                    value={this.state.data.rating}
                    onChange={value => this.setValue('rating', value)} />
                <Group>
                    <Textarea
                        value={this.state.data.header}
                        onChange={e=>{
                            this.setValue('header', e.target.value)
                            this.setError('header', !e.target.value)
                        }}
                        style={{ minHeight: '150px' }}
                        error={this.state.error.header}
                        block />
                </Group>
                <Group sm>
                    <Label bold>Назначить редактора статьи</Label>
                    <Select
                        options={users}
                        error={this.state.error.editor}
                        onChange={() => this.setError('editor', false)}
                        icon="search"
                        name="editor" />
                </Group>
                <Group sm>
                    <Label bold>Назначить редактора в прямой эфир</Label>
                    <Select icon="search" options={users} name="online_editor" />
                </Group>
                <Group sm>
                    <Label bold>Собрать команду для съемки сюжета</Label>
                    <Select icon="search" options={users} name="video_group" />
                </Group>
                <Group>
                    <Label light right>Не более 4 слов через пробел</Label>
                    <Input
                        name="keywords"
                        placeholder="Ключевые слова"
                        error={this.state.error.keywords}
                        onChange={e => this.setError('keywords', false)}
                        block />
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
