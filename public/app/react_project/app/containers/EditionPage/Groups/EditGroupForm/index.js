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

import { StyledUser, StyledTypedBtn, CloseBtn } from '../../style';
import {
    Form,
    StyledControlsGroup,
} from './style';

// eslint-disable-next-line react/prefer-stateless-function
class EditGroupForm extends PureComponent {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(dataImmutable) {
        const data = dataImmutable.toJS();
        data.password = data.password || null;

        this.props.onEdit(data);
    }

    render() {
        const {
            user,
            handleSubmit,
            permissions,
            valid,
            dirty,
            onClose,
            onDelete,
        } = this.props;

        return (
            <Form onSubmit={handleSubmit(this.onSubmit)}>
                <CloseBtn onClick={onClose}>
                    <Close width="15" height="15" />
                </CloseBtn>
                <StyledUser data={user} />
                <StyledControlsGroup
                    name="permissions"
                    items={permissions}
                    showError
                />
                <Field
                    name="id"
                    type="hidden"
                    component="input"
                />
                <Group marginBottom={rem(38)}>
                    <Field
                        type="checkbox"
                        name="enabled"
                        activePosition="left"
                        labels={['Активна', 'Заблокирована']}
                        component={SwitchRedux}
                    />
                </Group>
                <Group horizontal>
                    <StyledTypedBtn
                        block
                        buttonType="cancel"
                        type="button"
                        onClick={onDelete}
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

EditGroupForm.propTypes = {
    user: PropTypes.object,
    handleSubmit: PropTypes.func,
    onClose: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    permissions: PropTypes.array,
    valid: PropTypes.bool,
    dirty: PropTypes.bool,
};

const validate = (values) => {
    const errors = {};

    const permissions = values.get('permissions');

    if (!permissions || !permissions.size) {
        errors.permissions = 'Выберите хотя бы один пункт из списка';
    }

    return errors;
};

export default reduxForm({
    form: 'editGroupForm',
    enableReinitialize: true,
    validate,
})(EditGroupForm);
