import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import Button from 'components/Button';
import { Group } from 'components/Form';
import {
    InputRedux,
} from 'components/Form/ReduxForm';
import { rem } from 'utils/style';
import { checkEmail } from 'utils/validate';

import { Form, GroupControls } from './style';

// eslint-disable-next-line react/prefer-stateless-function
class NewUserForm extends PureComponent {
    render() {
        const { handleSubmit, groups, valid } = this.props;

        return (
            <Form onSubmit={handleSubmit(this.props.addUser)}>
                <Group sm>
                    <Field
                        block
                        name="lastname"
                        placeholder="Фамилия"
                        component={InputRedux}
                    />
                </Group>
                <Group sm>
                    <Field
                        block
                        name="firstname"
                        placeholder="Имя"
                        component={InputRedux}
                    />
                </Group>
                <Group marginBottom={rem(32)}>
                    <Field
                        block
                        name="email"
                        showError
                        placeholder="Электронная почта"
                        type="email"
                        component={InputRedux}
                    />
                </Group>
                <Group sm>
                    <Field
                        block
                        name="login"
                        placeholder="Логин"
                        component={InputRedux}
                    />
                </Group>
                <Group marginBottom={rem(30)}>
                    <Field
                        block
                        name="password"
                        placeholder="Пароль"
                        showError
                        type="password"
                        component={InputRedux}
                    />
                </Group>
                <GroupControls name="group" items={groups} />
                <Button active={valid} success block>
                    Добавить пользователя
                </Button>
            </Form>
        );
    }
}

NewUserForm.propTypes = {
    handleSubmit: PropTypes.func,
    addUser: PropTypes.func,
    groups: PropTypes.array,
};

const validate = (values) => {
    const errors = {};

    if (!values.get('lastname')) {
        errors.lastname = 'Введите фамилию нового пользователя';
    }

    if (!values.get('firstname')) {
        errors.firstname = 'Введите имя нового пользователя';
    }

    const email = values.get('email');

    if (!email) {
        errors.email = 'Введите адрес электронной почты нового пользователя';
    } else if (!checkEmail(email)) {
        errors.email = 'Введите корректный адрес электронной почты';
    }

    if (!values.get('login')) {
        errors.login = 'Введите логин нового пользователя';
    }

    const pass = values.get('password');

    if (!pass || pass.length < 6) {
        errors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (!values.get('group')) {
        errors.group = 'Выберите группу';
    }

    return errors;
};

// eslint-disable-next-line no-class-assign
NewUserForm = reduxForm({
    form: 'newUserForm',
    validate,
})(NewUserForm);

export default NewUserForm;
