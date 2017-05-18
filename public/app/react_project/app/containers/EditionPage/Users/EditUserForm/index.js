import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { rem } from 'utils/style';
import { Group } from 'components/Form';
import {
    InputRedux,
    SwitchRedux,
} from 'components/Form/ReduxForm';
import { Close } from 'components/Icon/svg';
import { checkEmail } from 'utils/validate';

import { StyledTypedBtn } from '../../style';
import {
    Form,
    StyledUser,
    GroupControls,
    CloseBtn,
} from './style';

// eslint-disable-next-line react/prefer-stateless-function
class EditUserForm extends PureComponent {
    onSubmit(dataImmutable) {
        const data = dataImmutable.toJS();
        data.password = data.password || null;
    }

    render() {
        const { user, handleSubmit, groups, valid, dirty } = this.props;

        return (
            <Form onSubmit={handleSubmit(this.onSubmit)}>
                <CloseBtn>
                    <Close width="15" height="15" />
                </CloseBtn>
                <StyledUser data={user} />
                <Group sm>
                    <Field
                        name="email"
                        type="email"
                        block
                        showError
                        placeholder="Электронная почта"
                        component={InputRedux}
                    />
                </Group>
                <Group sm>
                    <Field
                        name="login"
                        block
                        placeholder="Логин"
                        component={InputRedux}
                    />
                </Group>
                <Group marginBottom={rem(40)}>
                    <Field
                        name="password"
                        type="password"
                        block
                        showError
                        placeholder="Пароль"
                        component={InputRedux}
                    />
                </Group>
                <GroupControls name="group" items={groups} />
                <Group marginBottom={rem(38)}>
                    <Field
                        type="checkbox"
                        name="enabled"
                        activePosition="left"
                        labels={['Активен', 'Заблокирован']}
                        component={SwitchRedux}
                    />
                </Group>
                <Group horizontal>
                    <StyledTypedBtn
                        block
                        buttonType="cancel"
                        type="button"
                    >
                        Удалить
                    </StyledTypedBtn>
                    <StyledTypedBtn
                        block
                        active={valid && dirty}
                        buttonType="save"
                        type="submit"
                    >
                        Сохранить
                    </StyledTypedBtn>
                </Group>
            </Form>
        );
    }
}

EditUserForm.propTypes = {
    user: PropTypes.object,
    handleSubmit: PropTypes.func,
    groups: PropTypes.array,
    valid: PropTypes.bool,
    dirty: PropTypes.bool,
};

const validate = (values) => {
    const errors = {};
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

    if (pass && pass.length < 6) {
        errors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (!values.get('group')) {
        errors.group = 'Выберите группу';
    }

    return errors;
};

export default reduxForm({
    form: 'editUserForm',
    validate,
})(EditUserForm);
