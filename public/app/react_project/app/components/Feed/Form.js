import React, { Component } from 'react';
import { toastrEmitter as toastr } from 'react-redux-toastr/lib/toastrEmitter';
import styled from 'styled-components'

import Tags from './../Tags';
import Rating from './../Rating';
import Icon from './../Icon';
import Button from './../Button';
import {
    Input,
    InputIcon,
    Group,
    Textarea,
    Label,
} from './../Form';
import Select from './Select';

const FixedForm = styled.form`
    position: fixed;
    top: 120px;
    bottom: 0px;
    overflow-y: scroll;
`;

class Form extends Component {

    constructor(props) {
        super(props);


        this.state = {
            data: {
                header: props.data.header || '',
                rating: 5,
                keywords: this.getKeywords(props),
            },
            error: {},
        };

        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                data: {
                    ...this.state.data,
                    header: nextProps.data.header,
                    keywords: this.getKeywords(nextProps),
                    rating: 5,
                },
                error: {},
            });
        }
    }

    getKeywords(props) {
        const keywords = props.data.tags;

        return keywords ? keywords.replace(/,/g, '') : '';
    }

    setValue(prop, value) {
        this.setState({
            data: {
                ...this.state.data,
                [prop]: value,
            },
        });
    }

    setError(prop, value) {
        this.setState({
            error: {
                ...this.state.error,
                [prop]: value,
            },
        });
    }

    validateField(prop, predicate) {
        return predicate(prop);
    }

    validate(form) {
        const errors = {
            header: !this.state.data.header,
        };

        this.setState({
            error: errors,
        });

        return errors;
    }

    submitHandler(e) {
        e.preventDefault();

        const form = new FormData(e.target);

        const errors = this.validate(form);

        if (Object.values(errors).reduce((a, b) => a || b, false)) {
            toastr.warning('Заполните обязательные поля');

            return;
        }

        this.props.onSubmit({
            header: this.state.data.header,
            rating: this.state.data.rating,
            rubrics: form.getAll('tags'),
            editor: form.get('editor'),
            online_editor: form.get('online_editor'),
            video_group: form.get('video_group'),
            keywords: form.get('keywords').split(' ').slice(0, 4),
            comment: form.get('comment'),

            id: this.props.data.id,
        });

        this.setState({
            data: {
                ...this.state.data,
                id: null,
            },
        });
    }

    render() {
        let { data, users, rubrics } = this.props;

        return (
            <FixedForm onSubmit={this.submitHandler}>
                <Tags data={rubrics} />
                <Rating
                    value={this.state.data.rating}
                    onChange={(value) => this.setValue('rating', value)}
                />
                <Group>
                    <Textarea
                        value={this.state.data.header}
                        onChange={(e) => {
                            this.setValue('header', e.target.value);
                            this.setError('header', !e.target.value);
                        }}
                        style={{ minHeight: '150px' }}
                        error={this.state.error.header}
                        block
                    />
                </Group>
                <Group sm>
                    <Label bold>Назначить редактора статьи</Label>
                    <Select
                        options={users}
                        icon="search"
                        name="editor"
                    />
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
                        value={this.state.data.keywords}
                        onChange={(e) => {
                            this.setValue('keywords', e.target.value);
                        }}
                        name="keywords"
                        placeholder="Ключевые слова"
                        block
                    />
                </Group>
                <Group>
                    <InputIcon icon="clip" name="comment" block placeholder="Комментарий" />
                </Group>
                <Group>
                    <Button block success>
                        Отправить в работу
                    </Button>
                </Group>
            </FixedForm>
        );
    }
}

export default Form;
