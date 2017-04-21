/**
*
* HashTags
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.ul`
    margin: .1rem 0 0 .2rem;
    padding: 0;

    font-size: .65rem;
    font-weight: 700;
    color: #999;
    letter-spacing: .05rem;

    list-style: none;
`;

const Tag = styled.li`
    display: inline-block;
    margin-right: .5rem;
`;

const renderTag = (tag) => <Tag key={tag}>#{tag}</Tag>;

function HashTags({ tags }) {
    return (
        <Wrapper>
            {tags.map(renderTag)}
        </Wrapper>
    );
}

HashTags.defaultProps = {
    tags: [],
};

HashTags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
};

export default HashTags;
