import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './style.scss';

function Tabs({ data, active, onChange, classNames }) {
    return (
        <div className={cn(['breadcrumb', classNames.root])}>
            <ul className={cn(['breadcrumb__ul', classNames.ul])}>
                {data.map(v => (
                    <li
                        key={v.id}
                        className={cn('breadcrumb__item', {
                            breadcrumb__item_active: v.id == active,
                        })}
                    >
                        <a
                            className="breadcrumb__link"
                            onClick={() => onChange(v.id)}
                        >
                            {v.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

Tabs.defaultProps = {
    classNames: {},
};

Tabs.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        name: PropTypes.string,
    })),
    active: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    classNames: PropTypes.shape({
        root: PropTypes.string,
        ul: PropTypes.string,
    }),
};

export default Tabs;
