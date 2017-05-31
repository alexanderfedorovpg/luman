import React from 'react';
import styled from 'styled-components';

import Modal from 'components/Modal';

import { rem } from 'utils/style';

const Content = styled.div`
    position: relative;
    width: ${rem(1250)};
    background: #fff;
`

function PreviewModal({ children, ...props }) {

    return (
        <Modal {...props}>
            <Content>
                {children}
            </Content>
        </Modal>
    )
}

export default PreviewModal
