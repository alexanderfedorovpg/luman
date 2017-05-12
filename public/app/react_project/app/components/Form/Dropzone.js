import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ifProp, rem } from 'utils/style';
import ReactDropzone from 'react-dropzone';
import ImgPreview from 'components/ImgPreview';

const StyledDropzone = styled(({
    hasValue,
    ...rest
}) => <ReactDropzone {...rest} />)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    min-height: 243px;
    border: 2px dashed rgb(102, 102, 102);
    border-radius: 5px;
    overflow: hidden;

    ${ifProp('hasValue')`
        border: 0;
    `}
`;

const PlaceholderWrapper = styled.div`
    padding: 0 ${rem(5)};
`;

const Dropzone = ({ placeholder, value, ...props }) => (
    <StyledDropzone
        hasValue={!!value}
        title="Нажмите чтобы выбрать другое изображение"
        {...props}
    >
        {
            value ?
                <ImgPreview img={typeof value === 'string' ? value : value[0]} />
                :
                (
                    <PlaceholderWrapper>
                        {placeholder}
                    </PlaceholderWrapper>
                )
        }
    </StyledDropzone>
);

Dropzone.defaultProps = {
    placeholder: 'Выберите изображение',
};

Dropzone.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.instanceOf(File)),
    ]),
    placeholder: PropTypes.string,
};

export default Dropzone;
