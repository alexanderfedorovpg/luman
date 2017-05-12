import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field } from 'redux-form/immutable';

import { Group, Label } from 'components/Form';
import { InputRedux, ImageLoaderRedux } from 'components/Form/ReduxForm';
import { rem } from 'utils/style';
import { makeAccountFormInitialValues } from '../selectors';
import { editUserData } from '../actions';
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

        this.state = {
            editPassword: false,
        };

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
        if (this.state.editPassword) {
            return;
        }

        e.preventDefault();
    }

    onChangePasswordBtnClick(e) {
        e.preventDefault();

        this.setState(
            {
                editPassword: true,
            },
            () => { this.passwordField.querySelector('input').focus(); }
        );
    }

    render() {
        const { handleSubmit, valid, dirty, reset } = this.props;

        return (
            <Wrapper onSubmit={handleSubmit(this.onSubmit)}>
                <Left>
                    <Field
                        name="avatar_id"
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
                        marginBottom={this.state.editPassword ? rem(10) : rem(30)}
                        innerRef={(el) => { this.passwordField = el; }}
                    >
                        <Field
                            block
                            name="password"
                            showError
                            placeholder="Пароль"
                            onChange={this.onPasswordChange}
                            readOnly={!this.state.editPassword}
                            component={InputRedux}
                        />
                        {
                            !this.state.editPassword &&
                            (
                                <ChangePasswordBtn onClick={this.onChangePasswordBtnClick}>
                                    Сменить пароль
                                </ChangePasswordBtn>
                            )
                        }
                    </Group>
                    {
                        this.state.editPassword &&
                        (
                            <Group marginBottom={rem(30)}>
                                <Label light>
                                    <LabelText>
                                        Повторите пароль
                                    </LabelText>
                                    <Field
                                        block
                                        showError
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

    const pass = values.get('password');

    if (pass.length < 6) {
        errors.password = 'Пароль должен быть минимум 6 символов';
    }

    if (props.initialValues.get('password') !== pass) {
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
    validate,
})(AccountForm);

const mapStateToProps = createStructuredSelector({
    initialValues: makeAccountFormInitialValues(),
});

export default connect(mapStateToProps, { editUserData })(AccountForm);
