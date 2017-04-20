import React from 'react';
import styled from 'styled-components';
import { rem } from 'utils/style';

import Tags from 'components/Tags';
import { tags } from './constants';

const Wrapper = styled.div`
    padding-left: ${rem(24)};
    margin-top: ${rem(-6)};
`;

const TopPanel = () => (
    <Wrapper>
        <Tags type="radio" data={tags} value={['Все']} />
    </Wrapper>
);

export default TopPanel;
