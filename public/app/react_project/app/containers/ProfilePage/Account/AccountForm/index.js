import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field } from 'redux-form/immutable';

import { Group, Label } from 'components/Form';
import { InputRedux, ImageLoaderRedux } from 'components/Form/ReduxForm';
import { rem } from 'utils/style';
import {
    makeAccountFormInitialValues,
    makeGetCanEditPassword,
} from '../../selectors';
import { editUserData, enableEditPassword } from '../../actions';
import {
    Wrapper,
    Left,
    Right,
    Delimiter,
    JustifyGroup,
    StyledBtn,
    ChangePasswordBtn,
    LabelText,
} from './style';

// eslint-disable-next-line react/prefer-stateless-function
class AccountForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onChangePasswordBtnClick = this.onChangePasswordBtnClick.bind(this);
    }

    onSubmit(data) {
        if (!this.props.dirty) {
            return;
        }

        this.props.editUserData(data.toJS());
    }

    onPasswordChange(e) {
        if (this.props.canEditPassword) {
            return;
        }

        e.preventDefault();
    }

    onChangePasswordBtnClick(e) {
        e.preventDefault();

        this.props.enableEditPassword();
        this.passwordField.querySelector('input').focus();
    }

    render() {
        const { handleSubmit, valid, dirty, reset, canEditPassword } = this.props;

        return (
            <Wrapper onSubmit={handleSubmit(this.onSubmit)}>
                <Left>
                    <Field
                        name="avatar"
                        size="xs"
                        round
                        icon
                        imgCover
                        overlay
                        placeholder="Фото для аватарки"
                        component={ImageLoaderRedux}
                    />
                </Left>
                <Right>
                    <Group sm>
                        <Field
                            block
                            name="firstname"
                            placeholder="Имя"
                            component={InputRedux}
                        />
                    </Group>
                    <Group sm>
                        <Field
                            block
                            name="lastname"
                            placeholder="Фамилия"
                            component={InputRedux}
                        />
                    </Group>
                    <Delimiter />
                    <Group sm>
                        <Label bold>
                            Данные для авторизации
                        </Label>
                        <Field
                            block
                            name="email"
                            type="email"
                            placeholder="Электронная почта"
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
                    <Group
                        marginBottom={canEditPassword ? rem(10) : rem(30)}
                        innerRef={(el) => { this.passwordField = el; }}
                    >
                        <Field
                            block
                            name="password"
                            showError
                            placeholder="Пароль"
                            type="password"
                            onChange={this.onPasswordChange}
                            readOnly={!canEditPassword}
                            component={InputRedux}
                        />
                        {
                            !canEditPassword &&
                            (
                                <ChangePasswordBtn onClick={this.onChangePasswordBtnClick}>
                                    Сменить пароль
                                </ChangePasswordBtn>
                            )
                        }
                    </Group>
                    {
                        canEditPassword &&
                        (
                            <Group marginBottom={rem(30)}>
                                <Label light>
                                    <LabelText>
                                        Повторите пароль
                                    </LabelText>
                                    <Field
                                        block
                                        showError
                                        type="password"
                                        name="password_repeat"
                                        placeholder="Повторите пароль"
                                        component={InputRedux}
                                    />
                                </Label>
                            </Group>
                        )
                    }
                    <JustifyGroup horizontal>
                        <StyledBtn
                            type="reset"
                            buttonType="cancel"
                            onClick={reset}
                            active={dirty}
                        >
                            Отменить изменения
                        </StyledBtn>
                        <StyledBtn
                            buttonType="save"
                            type="submit"
                            active={valid && dirty}
                        />
                    </JustifyGroup>
                </Right>
            </Wrapper>
        );
    }
}

const validate = (values, props) => {
    const errors = {};

    if (!values.get('name')) {
        errors.name = 'Не введено имя';
    }

    if (!values.get('surname')) {
        errors.surname = 'Не введена фамилия';
    }

    if (!values.get('email')) {
        errors.email = 'Не введен email';
    }

    if (!values.get('login')) {
        errors.login = 'Не введен логин';
    }

    if (props.canEditPassword) {
        const pass = values.get('password');

        if (!pass || pass.length < 6) {
            errors.password = 'Пароль должен быть минимум 6 символов';
        }

        if (values.get('password_repeat') !== pass) {
            errors.password_repeat = 'Пароли не совпадают';
        }
    }

    return errors;
};

// eslint-disable-next-line no-class-assign
AccountForm = reduxForm({
    form: 'accountForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false,
    validate,
})(AccountForm);

const mapStateToProps = createStructuredSelector({
    initialValues: makeAccountFormInitialValues(),
    canEditPassword: makeGetCanEditPassword(),
});

export default connect(mapStateToProps, { editUserData, enableEditPassword })(AccountForm);
