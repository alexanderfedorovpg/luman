import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import Button from 'components/Button';
import { Group } from 'components/Form';
import {
    InputRedux,
} from 'components/Form/ReduxForm';
import { rem } from 'utils/style';

import { Form, StyledControlsGroup } from './style';

// eslint-disable-next-line react/prefer-stateless-function
class NewGroupForm extends PureComponent {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(data) {
        this.props.addGroup(data.toJS());
    }

    render() {
        const { handleSubmit, permissions, valid } = this.props;

        return (
            <Form onSubmit={handleSubmit(this.onSubmit)}>
                <Group marginBottom={rem(33)}>
                    <Field
                        block
                        name="name"
                        placeholder="Название группы"
                        component={InputRedux}
                    />
                </Group>
                <StyledControlsGroup
                    name="permissions"
                    items={permissions}
                    showError
                />
                <Button active={valid} success block>
                    Добавить группу
                </Button>
            </Form>
        );
    }
}

NewGroupForm.propTypes = {
    handleSubmit: PropTypes.func,
    addGroup: PropTypes.func,
    permissions: PropTypes.array,
    valid: PropTypes.bool,
};

const validate = (values) => {
    const errors = {};

    if (!values.get('name')) {
        errors.name = 'Введите название группы';
    }

    const permissions = values.get('permissions');

    if (!permissions || !permissions.length) {
        errors.permissions = 'Выберите хотя бы один пункт из списка';
    }

    return errors;
};

// eslint-disable-next-line no-class-assign
NewGroupForm = reduxForm({
    form: 'newGroupForm',
    destroyOnUnmount: false,
    validate,
})(NewGroupForm);

export default NewGroupForm;
