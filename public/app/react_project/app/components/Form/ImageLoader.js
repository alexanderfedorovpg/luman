import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp, rem, em, hidden } from 'utils/style';
import { color } from 'constants/style';
import ImgPreview from 'components/ImgPreview';
import { Camera } from 'components/Icon/svg';

const sizes = {
    xs: {
        side: 120,
        fontSize: 14,
    },
    s: {
        side: 130,
        fontSize: 14,
    },
};

const Wrapper = styled.label`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    color: #c4c4c4;
    text-align: center;

    border: 1px solid rgba(204, 204, 204, 0.74);
    border-radius: 0;
    cursor: pointer;

    &:hover {
        .image-loader-overlay {
            display: flex;
        }
    }

    ${ifProp('round')(css`
        border-radius: 50%;
    `)}

    ${ifProp('success')(css`
        border-color: ${color.success};
    `)}

    ${ifProp('error')(css`
        border-color: ${color.danger};
    `)}

    ${ifProp('size')(css`
        width: ${({ size }) => rem(sizes[size].side)};
        height: ${({ size }) => rem(sizes[size].side)};

        font-size: ${({ size }) => sizes[size].fontSize ? rem(sizes[size].fontSize) : rem(16)}
    `)}
`;

const Overlay = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: none;
    align-items: center;
    justify-content: center;

    text-align: center;
    font-size: .8rem;
    color: #fff;

    background-color: rgba(0, 0, 0, .3);
`;

const Input = styled.input`
    ${hidden()}
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

const ImageLoader = ({
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
    imgCover,
    overlay,
    ...rest
}) => (
    <Wrapper
        overlay={value ? overlay : false}
        success={success}
        error={error}
        title={overlay ? '' : 'Нажмите чтобы выбрать другое изображение'}
        {...rest}
    >
        <Input
            type="file"
            name={name}
            accept={accept}
            required={required}
            disabled={disabled}
            onChange={onChange}
        />
        {
            !!overlay && !!value &&
            (
                <Overlay className="image-loader-overlay">
                    {typeof overlay === 'string' ? overlay : 'Изменить'}
                </Overlay>
            )
        }
        {
            value ?
                <ImgPreview
                    cover={imgCover}
                    img={typeof value === 'string' ? value : value[0]}
                />
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
    </Wrapper>
);

ImageLoader.defaultProps = {
    placeholder: 'Выберите изображение',
};

ImageLoader.propTypes = {
    value: PropTypes.any,
    icon: PropTypes.bool,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    accept: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    success: PropTypes.bool,
    imgCover: PropTypes.bool,
    overlay: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default ImageLoader;
