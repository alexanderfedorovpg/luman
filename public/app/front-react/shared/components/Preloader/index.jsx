import React, { Children } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import InlineSVG from 'components/InlineSVG';

import icon from './icon.svg';
import './style.scss';

const Preloader = ({ children, className }) => (
    <div className={cn(['preloader', className])}>
        <InlineSVG className="preloader__icon" src={icon} />
        {
            children ?
                Children.toArray(children) :
                ' Идёт загрузка'
        }
    </div>
);

Preloader.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

export default Preloader;
