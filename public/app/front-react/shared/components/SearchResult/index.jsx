import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
// import { FormattedRelative } from 'react-intl';
import FormatDate from 'components/FormatDate';

import './style.scss';

const SearchResult = ({
    classNames,
    img,
    id,
    title,
    text,
    date,
    categoryName,
    categoryLink,
}) => {
    const link = `${categoryLink}/${id}`;
    const dateObj = date instanceof Date ? date : new Date(date);
    const rootClass = cn([
        'global-search-item',
        classNames.root,
        {
            'global-search-item--full': !img,
        },
    ]);

    return (
        <article className={rootClass}>
            {
                !!img &&
                (
                    <figure className="global-search-item__img-block">
                        <Link className="global-search-item__link" to={link}>
                            <img
                                className="global-search-item__img"
                                src={img}
                                alt=""
                                role="presentation"
                            />
                        </Link>
                    </figure>
                )
            }
            <div className="global-search-item__text">
                <div className="global-search-item__category-link">
                    <Link className="global-search-item__category" to={categoryLink}>
                        {categoryName}
                    </Link>
                </div>
                <Link className="global-search-item__title" to={link}>
                    {title}
                </Link>
                <p className="global-search-item__introtext">
                    {text}
                </p>
                <time
                    className="global-search-item__time"
                    dateTime={dateObj.toISOString()}
                >
                    <FormatDate value={dateObj}/>
                </time>
            </div>
        </article>
    );
};

SearchResult.defaultProps = {
    classNames: {},
};

SearchResult.propTypes = {
    classNames: PropTypes.shape({
        root: PropTypes.string,
    }),
    img: PropTypes.string,
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
    categoryName: PropTypes.string,
    categoryLink: PropTypes.string.isRequired,
};

export default SearchResult;
