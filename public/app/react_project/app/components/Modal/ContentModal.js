import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Close } from 'components/Icon/svg';
import H2 from 'components/H2';
import { rem } from 'utils/style';
import Modal from './';

const Title = styled(H2)`
    margin-top: 0;
    margin-bottom: ${rem(15)};;
`;

const ModalContent = styled.div`
    position: relative;

    width: ${({ width }) => width || '100%'}
    margin: 0 auto;
    padding: ${rem(40)} ${rem(23)} ${rem(30)};

    box-shadow: 1px 1px 4px rgba(0, 0, 0, .16);
    background-color: #fff;
`;

const CloseBtn = styled(Close)`
    position: absolute;
    top: 14px;
    right: 14px;
`;

const ContentModal = ({ title, contentWidth, children, ...restProps }) => (
    <Modal {...restProps}>
        <ModalContent width={contentWidth}>
            <CloseBtn onClick={restProps.onRequestClose} />
            {
                !!title &&
                <Title>{title}</Title>
            }
            {Children.toArray(children)}
        </ModalContent>
    </Modal>
);

ContentModal.defaultProps = {
    contentWidth: rem(535),
};

ContentModal.propTypes = {
    contentWidth: PropTypes.string,
    children: PropTypes.node,
    title: PropTypes.string,
};

export default ContentModal;
