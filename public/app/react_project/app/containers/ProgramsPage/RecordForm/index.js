import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Group, Select, Input, FileInput } from 'components/Form';
import { Close, ArrowDown } from 'components/Icon/svg';
import {
    StyledBtn,
} from './style';
import { makeGetProgramsAsOptions } from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
class RecordForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onCancelClick = this.onCancelClick.bind(this);
    }

    onSubmit(data) {
        console.log(data);
    }

    onCancelClick(e) {
        e.preventDefault();

        this.props.reset();

        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    renderInput({ input, meta: { touched, invalid }, ...props }) {
        return (
            <Input
                {...props}
                success={touched && !invalid}
                error={touched && invalid}
                value={input.value}
                onChange={(e) => input.onChange(e)}
            />
        );
    }

    renderFileInput({ input, meta: { touched, invalid }, ...props }) {
        return (
            <FileInput
                {...props}
                success={touched && !invalid}
                error={touched && invalid}
                value={input.value}
                onChange={(e) => input.onChange(e.target.files)}
            />
        );
    }

    renderSelect({ input, meta: { touched, invalid }, ...props }) {
        return (
            <Select
                {...props}
                success={touched && !invalid}
                error={touched && invalid}
                value={input.value}
                onChange={(option) => input.onChange(option.value)}
                onBlur={() => input.onBlur(input.value)}
            />
        );
    }

    render() {
        const { programs, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
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
                        name="video_url"
                        accept="video/*"
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
};

const mapStateToProps = createStructuredSelector({
    programs: makeGetProgramsAsOptions(),
});

export default connect(mapStateToProps)(RecordForm);
