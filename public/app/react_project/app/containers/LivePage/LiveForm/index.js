import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, submit, Form } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { Group, Label } from 'components/Form';
import { FileInputRedux as FileInput } from 'components/Form/ReduxForm';
import Button from 'components/Button';

import {
    StyledTextarea as Textarea,
} from './style';
import { liveOn, liveOff } from '../actions';
import { makeGetSelected, makeGetLiveState } from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
class LiveForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onButtonClick = this.onButtonClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(data) {
        this.props.liveOn(data.toJS());
    }

    onButtonClick(e) {
        e.preventDefault();

        if (this.props.live) {
            this.props.liveOff();
        } else {
            this.props.submit('LiveForm');
        }
    }

    renderIdField({ input, meta: { touched, error }, ...props }) {
        return (
            <Group marginBottom={(touched && !!error) ? '15px' : '0'} >
                <input
                    {...props}
                    {...input}
                />
                {
                    touched && !!error &&
                    <Label error>{error}</Label>
                }
            </Group>
        );
    }

    render() {
        const { handleSubmit, live } = this.props;

        return (
            <Form onSubmit={handleSubmit(this.onSubmit)}>
                <Field
                    type="hidden"
                    name="id"
                    component={this.renderIdField}
                />
                <Group md>
                    <Field
                        block
                        name="title"
                        light
                        disabled={live}
                        component={Textarea}
                        placeholder="Название новости"
                    />
                </Group>
                <Group md>
                    <Field
                        block
                        icon="clip"
                        component={FileInput}
                        disabled={live}
                        accept="image/*"
                        name="image_preview"
                        placeholder="Изображение для превью"
                    />
                </Group>
                <Button
                    success={!live}
                    danger={live}
                    onClick={this.onButtonClick}
                    block
                >
                    {live ? 'Выключить' : 'Включить'} прямой эфир
                </Button>
            </Form>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.get('title')) {
        errors.title = 'Не введен заголовок новости';
    }

    if (!values.get('image_preview')) {
        errors.image_preview = 'Не выбрано изображение для превью';
    }

    if (!values.get('id')) {
        errors.id = 'Нужно выбрать новость из списка';
    }

    return errors;
};

LiveForm.propTypes = {
    handleSubmit: PropTypes.func,
    live: PropTypes.bool,
    liveOn: PropTypes.func,
    liveOff: PropTypes.func,
    submit: PropTypes.func,
};

// eslint-disable-next-line no-class-assign
LiveForm = reduxForm({
    validate,
    enableReinitialize: true,
    form: 'LiveForm',
})(LiveForm);

const mapStateToProps = createStructuredSelector({
    initialValues: makeGetSelected(),
    live: makeGetLiveState(),
});

export default connect(mapStateToProps, { submit, liveOn, liveOff })(LiveForm);
