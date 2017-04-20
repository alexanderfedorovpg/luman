/**
*
* Programs
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Program from './Program';

const Wrapper = styled.div`
    margin-top: 1rem;
`;

// eslint-disable-next-line react/prop-types
function renderItem({ id, ...props }) {
    return <Program key={id} {...props} />;
}

function Programs({ items }) {
    return (
        <Wrapper>
            {items.map(renderItem)}
        </Wrapper>
    );
}

Programs.defaultProps = {
    items: [],
};

Programs.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        ...Program.propTypes,
        id: PropTypes.number.isRequired,
    })),
};

export default Programs;
