import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import proschet from 'proschet';
import { ArrowUp, Clip } from 'components/Icon/svg';
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

const iconStyle = `
    position: absolute;
    top: 50%;
    left: ${rem(13)};

    transform: translateY(-50%);
`;

const ArrowIcon = styled(ArrowUp)`
    ${iconStyle}

    width: ${rem(12)};
    height: ${rem(14)};

    color: #b6b6b6;
`;

const ClipIcon = styled(Clip)`${iconStyle}`;

const Input = styled.input`
    ${hidden()}
`;

const fileCases = ['файл', 'файла', 'файлов'];
const getFileCase = proschet(fileCases);

const renderIcon = (iconName) => {
    switch (iconName) {
        case 'arrow':
            return <ArrowIcon />;

        case 'clip':
            return <ClipIcon color="#4f4f4f" />;

        default:
            return '';
    }
};

// eslint-disable-next-line react/prefer-stateless-function
const FileInput = ({
    value,
    required,
    disabled,
    error,
    success,
    icon,
    accept,
    name,
    onChange,
    placeholder,
    ...rest
}) => {
    let fileName = null;

    if (value) {
        if (typeof value === 'string') {
            fileName = value;
        } else {
            fileName = value.length > 1 ?
                `Выбрано ${value.length} ${getFileCase(value.length)}` :
                value[0].name;
        }
    }

    return (
        <Wrapper {...rest} icon={icon} success={success} error={error} hasVal={!!value}>
            <Input
                type="file"
                name={name}
                accept={accept}
                required={required}
                disabled={disabled}
                onChange={onChange}
            />
            {
                !!icon &&
                renderIcon(icon)
            }
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
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    accept: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    success: PropTypes.bool,
};

export default FileInput;
