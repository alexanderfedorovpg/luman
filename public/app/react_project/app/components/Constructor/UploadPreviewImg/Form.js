/**
 * Created by Frimko on 19.06.2017.
 * mailto ccc-car@yandex.ru.
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {reduxForm, Field } from 'redux-form/immutable';
import TypedBtn from 'components/Button/TypedBtn';
import { Group } from 'components/Form';
import { ImageLoaderRedux, } from 'components/Form/ReduxForm';

const StyledBtn = styled(TypedBtn)`
    flex-grow: 1;

    &:not(:last-child) {
        margin-right: 5px;
    }
`;

const GroupTop = styled(Group)`
    align-items: flex-start;
    justify-content: center;
`;

const Form = ({valid, dirty, handleSubmit}) =>{
    return (
        <form onSubmit={handleSubmit}>
            <GroupTop md horizontal>
                <Field
                    placeholder="Выберите превью для видео"
                    name="preview"
                    accept="image/*"
                    multiple={false}
                    icon
                    size="s"
                    component={ImageLoaderRedux}
                />
            </GroupTop>
            <Group horizontal>
                <StyledBtn
                    buttonType="upload"
                    success
                    disabled={!valid && !dirty}
                />
            </Group>
        </form>
    )
}
Form.propTypes = {
    handleSubmit: PropTypes.func,
};
const validate = (data) => {
    const errors = {};
    const values = data.toJS();
    if (!values.preview) {
        errors.preview = 'Вставьте картинку';
    }
    return errors;
};

export default reduxForm({
    form: 'uploadImageForCover',
    validate,
})(Form);