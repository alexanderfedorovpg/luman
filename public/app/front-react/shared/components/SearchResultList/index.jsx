import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SearchResult from 'components/SearchResult';

import './style.scss';

function renderItem(item) {
    return (
        <SearchResult
            classNames={{ root: 'global-search-result__global-search-item' }}
            key={item.id}
            {...item}
        />
    );
}

const SearchResultList = ({ classNames, items }) => {
    return (
        <div className={cn(['global-search-result', classNames.root])}>
            {items.map(renderItem)}
        </div>
    );
};

SearchResultList.propTypes = {
    classNames: PropTypes.shape({
        root: PropTypes.string,
    }),
    items: PropTypes.arrayOf(PropTypes.shape(SearchResult.propTypes)),
};

export default SearchResultList;
