import React from 'react';
import styled, { css } from 'styled-components';

import * as Content from 'components/Content';

import { rem, below } from 'utils/style'
import { padding } from 'constants/style'

export const Wrap = styled(Content.Wrap)``

export const Left = styled(Content.Left) `
    flex: 0 0 41.8%;
    width: 41.8%;
    position: relative;
`;

export const Right = styled(Content.Right)`
    flex-grow: 1;
`;
    // padding-left: ${rem(19)};
