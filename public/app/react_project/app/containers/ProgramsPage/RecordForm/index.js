import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, isDirty, isValid } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Group, Label } from 'components/Form';
import { SelectRedux, InputRedux } from 'components/Form/ReduxForm';
import { Close, ArrowDown } from 'components/Icon/svg';

import { StyledBtn } from '../style';
import { makeGetProgramsAsOptions, makeGetSelectedRecord } from '../selectors';
import { postRecord, editRecord } from '../actions';
import {
    StyledFileInput as FileInputRedux,
    StyledDatepicker as DatepickerRedux,
    StyledTextarea as TextareaRedux,
} from './style';

// eslint-disable-next-line react/prefer-stateless-function
class RecordForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onCancelClick = this.onCancelClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(immutableData) {
        const data = immutableData.toJS();

        if (!data.id) {
            this.props.postRecord(data);
        } else {
            this.props.editRecord(data);
        }
    }

    onCancelClick(e) {
        e.preventDefault();

        this.props.reset();

        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    render() {
        const { programs, handleSubmit, isFormValid, isFormDirty } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Field type="hidden" component="input" name="id" />
                <Group md>
                    <Field
                        placeholder="Программа"
                        searchable={false}
                        clearable={false}
                        name="program_id"
                        options={programs}
                        component={SelectRedux}
                    />
                </Group>
                <Group md>
                    <Field
                        block
                        placeholder="Название выпуска"
                        name="title"
                        component={InputRedux}
                    />
                </Group>
                <Group md horizontal>
                    <Field
                        name="publish_date"
                        component={DatepickerRedux}
                    />
                    <Field
                        name="video_url"
                        accept="video/*"
                        icon="arrow"
                        component={FileInputRedux}
                    />
                </Group>
                <Group marginBottom="40px">
                    <Label light>Разделяйте тезисы с помощью //</Label>
                    <Field
                        block
                        light
                        placeholder="Тезисы"
                        name="theses"
                        component={TextareaRedux}
                    />
                </Group>
                <Group horizontal>
                    <StyledBtn type="reset" onClick={this.onCancelClick} danger>
                        <Close opacity=".5" width="14" heiht="14" />
                        Отменить
                    </StyledBtn>
                    <StyledBtn
                        type="submit"
                        success
                        disabled={!isFormValid || !isFormDirty}
                        active={isFormValid && isFormDirty}
                    >
                        <ArrowDown opacity=".33" />
                        Загрузить
                    </StyledBtn>
                </Group>
            </form>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.get('title')) {
        errors.title = 'Не введен заголовок выпуска';
    }

    if (!values.get('program_id')) {
        errors.program_id = 'Не выбрана программа';
    }

    if (!values.get('video_url')) {
        errors.video_url = 'Не загружено видео';
    }

    return errors;
};

// eslint-disable-next-line no-class-assign
RecordForm = reduxForm({
    validate,
    form: 'recordForm',
})(RecordForm);

RecordForm.propTypes = {
    programs: PropTypes.arrayOf(PropTypes.object),
    reset: PropTypes.func,
    onCancel: PropTypes.func,
    handleSubmit: PropTypes.func,
    postRecord: PropTypes.func,
    editRecord: PropTypes.func,
    isFormDirty: PropTypes.bool,
    isFormValid: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    programs: makeGetProgramsAsOptions(),
    initialValues: makeGetSelectedRecord(),
    isFormDirty: isDirty('recordForm'),
    isFormValid: isValid('recordForm'),
});

export default connect(mapStateToProps, { postRecord, editRecord })(RecordForm);
