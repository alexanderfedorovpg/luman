import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'utils/style';

import Tags from 'components/Tags';

const Wrapper = styled.div`
    padding-left: ${rem(24)};
    margin-top: ${rem(-6)};
`;

const Rubrics = ({ selected, rubrics, onRubricChange }) => (
    <Wrapper>
        {
            !!rubrics &&
            <Tags
                type="radio"
                data={rubrics}
                value={[selected]}
                onChange={onRubricChange}
            />
        }
    </Wrapper>
);

Rubrics.propTypes = {
    selected: PropTypes.number,
    onRubricChange: PropTypes.func,
    rubrics: Tags.propTypes.data,
};

export default Rubrics;
