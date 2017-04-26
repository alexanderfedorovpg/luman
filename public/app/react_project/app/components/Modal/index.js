import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';
import Icon from 'components/Icon';
import { rem, ifProp } from 'utils/style';

const styles = {
    overlay: {
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, .4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        maxHeight: 'calc(100% - 80px)',
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
};

export const ModalContent = styled.div`
    position: relative;

    width: ${({ width }) => width || '100%'}
    margin: 0 auto;
    padding: ${rem(30)} ${rem(23)};
    ${ifProp('closeBtn')(css`
        padding-top: ${rem(40)}
    `)}

    box-shadow: 1px 1px 4px rgba(0, 0, 0, .16);
    background-color: #fff;
`;

const CloseIcon = styled(Icon)`
    position: absolute;
    top: 14px;
    right: 14px;
`;

export const CloseBtn = ({ onClick }) => <CloseIcon type="delete-lg" onClick={onClick} />;
CloseBtn.propTypes = {
    onClick: PropTypes.func,
};

function Modal(props) {
    const innerProps = {
        ...props,
        style: styles,
    };

    return (
        <ReactModal {...innerProps} />
    );
}

export default Modal;
