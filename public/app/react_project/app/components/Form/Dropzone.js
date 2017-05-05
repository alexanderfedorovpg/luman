import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp, rem, em } from 'utils/style';
import { color } from 'constants/style';
import ReactDropzone from 'react-dropzone';
import ImgPreview from 'components/ImgPreview';
import { Camera } from 'components/Icon/svg';

const sizes = {
    s: {
        width: 130,
        height: 130,
        fontSize: 14,
    },
};

const StyledDropzone = styled(({
    size,
    likeInput,
    success,
    error,
    hasValue,
    icon,
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

    ${ifProp('size')(css`
        width: ${({ size }) => rem(sizes[size].width)};
        height: ${({ size }) => rem(sizes[size].height)};
        min-height: 0;

        font-size: ${({ size }) => sizes[size].fontSize ? rem(sizes[size].fontSize) : rem(16)}
    `)}

    ${ifProp('hasValue')`
        border: 0;
    `}

    ${ifProp('likeInput')(css`
        color: #c4c4c4;

        border: 1px solid rgba(204, 204, 204, 0.74);
        border-radius: 0;

        ${ifProp('success')(css`
            border-color: ${color.success};
        `)}

        ${ifProp('error')(css`
            border-color: ${color.danger};
        `)}
    `)}
`;

const PlaceholderWrapper = styled.div`
    padding: 0 ${rem(5)};
`;

const Icon = styled(Camera)`
    display: block;
    width: ${em(40)};
    height: ${em(40)};
    margin-left: auto;
    margin-right: auto;
    margin-bottom: ${em(5)};

    color: #eee;
`;

const Dropzone = ({ placeholder, value, icon, ...props }) => (
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
                        {
                            !!icon &&
                            <Icon />
                        }
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
    icon: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.instanceOf(File)),
    ]),
    placeholder: PropTypes.string,
};

export default Dropzone;
