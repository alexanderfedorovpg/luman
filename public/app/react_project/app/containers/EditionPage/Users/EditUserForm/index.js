import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

// eslint-disable-next-line react/prefer-stateless-function
class EditUserForm extends PureComponent {
    render() {
        return (
            <div>

            </div>
        );
    }
}

EditUserForm.propTypes = {

};

export default reduxForm({
    form: 'editUserForm',
})(EditUserForm);
