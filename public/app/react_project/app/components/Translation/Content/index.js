import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { reduxForm, Field } from 'redux-form/immutable'

import { Wrap } from 'components/Content'
import Timeline from 'components/Translation/Timeline'
import { Group, Textarea, Label } from 'components/Form'
import Input from 'components/Form/Input'
import { InputRedux, TextareaRedux, RichRedux } from 'components/Form/ReduxForm'
import Chat from 'components/Chat'
import {
    Right,
    Left,
    ImageLoader,
    Root,
    VideoStatus,
    VideoStatusTitle,
    VideoStatusTimer,
    Data,
    DataText
} from './style'

class Content extends PureComponent {

    handleSubmit(data) {
        console.log(data)
    }

    render() {
        const { valid, dirty, handleSubmit } = this.props

        return (
            <Root>
                <header>
                    <Wrap>
                        <Left>
                            <TranslationForm1 />
                        </Left>
                        <Right>
                            <VideoStatus>
                                <VideoStatusTitle>
                                    Трансляция включена:
                                </VideoStatusTitle>
                                <VideoStatusTimer>
                                    12 мин 24 с
                                </VideoStatusTimer>
                            </VideoStatus>
                        </Right>
                    </Wrap>
                </header>
                <Wrap margin>
                    <Left>
                        <TranslationForm2 />
                        <Timeline />
                    </Left>
                    <Right>
                        <Chat messages={[]} loading={false} />
                    </Right>
                </Wrap>
            </Root>
        )
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.get('title')) {
        errors.title = 'Не введен заголовок';
    }

    if (!values.get('body')) {
        errors.program_id = 'Не введен текст';
    }

    return errors;
}

const TranslationForm1 = reduxForm({
    form: 'translationForm',
    validate,
    onSubmit: values => console.log('1', values.toJS())
})(({}) => (
    <Field name="stream" component={InputRedux} block />
))

const TranslationForm2 = reduxForm({
    form: 'translationForm',
})(({}) => (
    <div>
        <Data>
            <Field name="image" component={ImageLoader} icon />
            <DataText>
                <Group>
                    <Label right light>
                        <span>Заголовок: </span>
                        осталось 30 символов
                    </Label>
                    <Field name="title" component={TextareaRedux} title block />
                </Group>
            </DataText>
        </Data>
        <Group>
            <Field name="body" component={RichRedux} />
        </Group>
    </div>
))

export default Content
