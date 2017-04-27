import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Group, Select, Input } from 'components/Form';
import { Close, ArrowDown } from 'components/Icon/svg';
import { StyledBtn } from '../style';
import { makeGetProgramsAsOptions, makeGetSelectedRecord } from '../selectors';
import { postRecord, editRecord } from '../actions';
import {
    StyledFileInput as FileInput,
    StyledDatepicker as Datepicker,
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

    renderInput({ input, meta: { touched, invalid, valid }, ...props }) {
        return (
            <Input
                {...props}
                success={touched && valid}
                error={touched && invalid}
                value={input.value}
                onChange={(e) => input.onChange(e)}
            />
        );
    }

    renderFileInput({ input, meta: { touched, invalid, valid }, ...props }) {
        return (
            <FileInput
                {...props}
                success={touched && valid}
                error={touched && invalid}
                value={input.value}
                onChange={(e) => input.onChange(e.target.files)}
            />
        );
    }

    renderSelect({ input, meta: { touched, invalid, valid }, ...props }) {
        return (
            <Select
                {...props}
                success={touched && valid}
                error={touched && invalid}
                value={input.value}
                onChange={(option) => input.onChange(option.value)}
                onBlur={() => input.onBlur(input.value)}
            />
        );
    }

    renderDatepicker({ input, meta: { touched, invalid, valid }, ...props }) {
        return (
            <Datepicker
                {...props}
                success={touched && valid}
                error={touched && invalid}
                selected={input.value}
                onChange={(value) => input.onChange(value)}
            />
        );
    }

    render() {
        const { programs, handleSubmit } = this.props;

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
                        component={this.renderSelect}
                    />
                </Group>
                <Group md>
                    <Field
                        block
                        placeholder="Название выпуска"
                        name="title"
                        component={this.renderInput}
                    />
                </Group>
                <Group marginBottom="40px" horizontal>
                    <Field
                        name="date"
                        component={this.renderDatepicker}
                    />
                    <Field
                        name="video_url"
                        accept="video/*"
                        icon="arrow"
                        component={this.renderFileInput}
                    />
                </Group>
                <Group horizontal>
                    <StyledBtn type="reset" onClick={this.onCancelClick} danger>
                        <Close opacity=".5" width="14" heiht="14" />
                        Отменить
                    </StyledBtn>
                    <StyledBtn type="submit" success>
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
};

const mapStateToProps = createStructuredSelector({
    programs: makeGetProgramsAsOptions(),
    initialValues: makeGetSelectedRecord(),
});

export default connect(mapStateToProps, { postRecord, editRecord })(RecordForm);
