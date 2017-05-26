import React from 'react';
import { Field, Fields, reduxForm } from 'redux-form/immutable';
import { toastrEmitter as toastr } from 'react-redux-toastr/lib/toastrEmitter';

import {
    InputRedux,
    TagsRedux,
    RichRedux,
} from 'components/Form/ReduxForm';
import { Horizontal, Group, Label } from 'components/Form';
import VideoUpload from './Form.VideoUpload'
import SpecialSelect from './Select'

import {
    RatingRedux,
    ImageLoaderRedux,
    Title,
    Subtitle,
    Theses,
    ImageRow,
    ImageCell,
} from './style';

const titleMax = 120;
const subtitleMax = 140;

function Part1Component({}) {

    return (
        <Field
            name="stream"
            component={InputRedux}
            placeholder="http://rtvi.com/"
            block />
    )
}

function Part2Component({}) {

    return (
        <Fields
            names={[
                'video.id',
                'video.file',
                'videoPreview.id',
                'videoPreview.file',
            ]}
            component={VideoUpload} />
    )
}



function Part3Component({ rubrics }) {

    return (
        <Horizontal>
            <Field
                name="top"
                component={RatingRedux} />

            <Field
                name="rubrics"
                data={rubrics}
                component={TagsRedux} />
        </Horizontal>
    )
}

function Part4Component(props) {

    return (
        <div>
            <Field
                name="title"
                title="Заголовок"
                limit={titleMax}
                component={LabeledTitle}
                block />

            <Field
                name="subtitle"
                title="Подзаголовок"
                limit={subtitleMax}
                component={LabeledSubtitle}
                block />

            <Field
                name="theses"
                title="Тезисы через //"
                component={LabeledSubtitle}
                block />

            <Group>
                <Field
                    name="body"
                    component={RichRedux} />
            </Group>

            <ImageRow>
                <ImageCell>
                    <Field
                        name="image_main"
                        component={ImageLoaderRedux}
                        placeholder="Выберите основное изображение"
                        icon />

                    <Field
                        name="image_main_title"
                        component={InputRedux}
                        placeholder="Название"
                        block />

                    <Field
                        name="image_main_author"
                        component={InputRedux}
                        placeholder="Автор"
                        block />

                    <Field
                        name="image_main_source"
                        component={InputRedux}
                        placeholder="Источник"
                        block />

                </ImageCell>
                <ImageCell>
                    <Field
                        name="image_preview"
                        component={ImageLoaderRedux}
                        placeholder="Выберите превью"
                        icon />

                    <Field
                        name="image_preview_title"
                        component={InputRedux}
                        placeholder="Название"
                        block />

                    <Field
                        name="image_preview_author"
                        component={InputRedux}
                        placeholder="Автор"
                        block />

                    <Field
                        name="image_preview_source"
                        component={InputRedux}
                        placeholder="Источник"
                        block />

                </ImageCell>
            </ImageRow>

            <Field
                name="keywords"
                description="Не более 4 слов через пробел"
                placeholder="Ключевые слова"
                component={LabeledInput}
                block />
        </div>
    )
}

function Part5Component(props) {

    return (
        <Field
            name="editor"
            component={SpecialSelect}
            {...props} />
    )
}

const LabeledTitle = labeledInput(Title)
const LabeledSubtitle = labeledInput(Subtitle)
const LabeledInput = labeledInput(InputRedux)

function labeledInput(WrappedComponent) {

    return ({ input, title, description, limit, ...props }) => {

        return (
            <Group>
                <LabelLimited value={input.value} limit={limit}>
                    {title &&
                        <span>
                            {title}
                        </span>
                    }
                    {description}
                </LabelLimited>
                <WrappedComponent input={input} {...props} />
            </Group>
        )
    }
}

function LabelLimited({ children, value, limit }) {
    let leftText = ''

    if (limit) {
        const left = limit - value.length

        leftText = `
            : осталось ${
                left < 0
                    ? <span className="out">{left}</span>
                    : left
            } символов
        `
    }

    return (
        <Label right light>
            {children}
            {leftText}
        </Label>
    )
}

const validate = data => {
    const values = data.toJS();
    let errors = {};

    if (!values.rubrics.length) {
        errors.rubrics = 'Выберите рубрики!';
    }

    if (!values.top) {
        errors.top = 'Укажите рейтинг!';
    }

    if (!values.title) {
        errors.title = 'Введите заголовок!';
    }
    else if (values.title.length > titleMax) {
        errors.title = `Заголовок не должен превышать ${titleMax} символов!`;
    }

    return errors
}

export const Part1 = reduxForm({
    form: 'articleEditorForm',
    validate,
    enableReinitialize: true,
    onSubmitFail: (errors, ttt, info) => {
        let key

        for (key in errors) {
            toastr.warning(errors[key])
        }
    }
})(Part1Component)

export const Part2 = reduxForm({
    form: 'articleEditorForm'
})(Part2Component)

export const Part3 = reduxForm({
    form: 'articleEditorForm'
})(Part3Component)

export const Part4 = reduxForm({
    form: 'articleEditorForm'
})(Part4Component)

export const Part5 = reduxForm({
    form: 'articleEditorForm'
})(Part5Component)
