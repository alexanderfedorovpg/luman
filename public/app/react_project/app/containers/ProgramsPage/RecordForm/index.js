import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Group, Label } from 'components/Form';
import {
    SelectRedux,
    InputRedux,
    RatingRedux,
} from 'components/Form/ReduxForm';
import { makeGetProgramsAsOptions } from 'containers/App/selectors';

import { StyledBtn } from '../style';
import { makeGetSelectedRecord } from '../selectors';
import { editRecord } from '../actions';
import {
    StyledFileInput as FileInputRedux,
    StyledDatepicker as DatepickerRedux,
    StyledTextarea as TextareaRedux,
    StyledImageLoader as ImageLoaderRedux,
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
        this.props.editRecord(data);
    }

    onCancelClick(e) {
        e.preventDefault();

        this.props.reset();

        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    render() {
        const { programs, handleSubmit, valid, dirty, canUploadFile, canUploadVideo } = this.props;

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
                        name="video"
                        accept="video/*"
                        icon="arrow"
                        disabled={!canUploadVideo}
                        placeholder="Выберите видео"
                        component={FileInputRedux}
                    />
                </Group>
                <Group md horizontal align="top">
                    <Field
                        placeholder="Добавить превью"
                        name="video_preview"
                        accept="image/*"
                        disabled={!canUploadFile}
                        multiple={false}
                        icon
                        size="s"
                        component={ImageLoaderRedux}
                    />
                    <Field
                        name="top"
                        component={RatingRedux}
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
                    <StyledBtn buttonType="cancel" type="reset" onClick={this.onCancelClick} />
                    <StyledBtn
                        type="submit"
                        buttonType="upload"
                        success
                        disabled={!valid || !dirty}
                        active={valid && dirty}
                    />
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

    if (!values.get('video')) {
        errors.video = 'Не загружено видео';
    }

    if (!values.get('top')) {
        errors.top = 'Укажите рейтинг';
    }

    return errors;
};

// eslint-disable-next-line no-class-assign
RecordForm = reduxForm({
    validate,
    form: 'recordForm',
})(RecordForm);

RecordForm.propTypes = {
    canUploadFile: PropTypes.bool,
    canUploadVideo: PropTypes.bool,
    dirty: PropTypes.bool,
    editRecord: PropTypes.func,
    handleSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    programs: PropTypes.arrayOf(PropTypes.object),
    reset: PropTypes.func,
    valid: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    programs: makeGetProgramsAsOptions(),
    initialValues: makeGetSelectedRecord(),
});

export default connect(mapStateToProps, { editRecord })(RecordForm);
