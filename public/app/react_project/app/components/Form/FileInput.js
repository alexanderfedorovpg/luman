import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import proschet from 'proschet';
import { ArrowUp } from 'components/Icon/svg';
import { rem, hidden } from 'utils/style';
import { inputCSS } from './Input';

const Wrapper = styled.label`
    ${inputCSS}
    position: relative;

    max-width: 100%;
    padding-left: ${rem(40)};
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;

    ${({ hasVal }) => !hasVal &&
        'color: #ccc;'
    }
`;

const Icon = styled(ArrowUp)`
    position: absolute;
    top: 50%;
    left: ${rem(13)};

    width: ${rem(12)};
    height: ${rem(14)};

    color: #b6b6b6;

    transform: translateY(-50%);
`;

const Input = styled.input`
    ${hidden()}
`;

const fileCases = ['файл', 'файла', 'файлов'];
const getFileCase = proschet(fileCases);

// eslint-disable-next-line react/prefer-stateless-function
const FileInput = ({
    value,
    required,
    disabled,
    error,
    success,
    accept,
    inputName,
    onChange,
    placeholder,
}) => {
    let fileName = null;

    if (typeof value === 'string') {
        fileName = value;
    } else {
        fileName = value.length > 1 ?
            `Выбрано ${value.length} ${getFileCase(value.length)}` :
            value[0].name;
    }

    return (
        <Wrapper success={success} error={error} hasVal={!!value}>
            <Input
                type="file"
                name={inputName}
                accept={accept}
                required={required}
                disabled={disabled}
                onChange={onChange}
            />
            <Icon />
            {
                fileName || placeholder
            }
        </Wrapper>
    );
};

FileInput.defaultProps = {
    placeholder: 'Выберите файл',
};

FileInput.propTypes = {
    value: PropTypes.any,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    accept: PropTypes.string,
    inputName: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    success: PropTypes.bool,
};

export default FileInput;
