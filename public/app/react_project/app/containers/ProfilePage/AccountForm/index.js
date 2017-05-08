import React from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { Group } from 'components/Form';
import { InputRedux } from 'components/Form/ReduxForm';
import {
    Wrapper,
    Left,
    Right,
} from './style';

// eslint-disable-next-line react/prefer-stateless-function
class AccountForm extends React.PureComponent {
    render() {
        return (
            <Wrapper>
                <Left />
                <Right>
                    <Group sm>
                        <Field
                            block
                            name="name"
                            placeholder="Имя"
                            component={InputRedux}
                        />
                    </Group>
                    <Group sm>
                        <Field
                            block
                            name="surname"
                            placeholder="Фамилия"
                            component={InputRedux}
                        />
                    </Group>
                </Right>
            </Wrapper>
        );
    }
}

// eslint-disable-next-line no-class-assign
AccountForm = reduxForm({
    form: 'accountForm',
})(AccountForm);

export default AccountForm;
