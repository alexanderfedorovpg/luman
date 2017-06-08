import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import IconInfo from 'components/Icon/Info'

import './style.scss'

function Title({ children, className, anchor }) {

    let link = anchor ? `/info-page#${anchor}` : '/info-page';

    return (
        <div className={classNames('title-block', className)}>
            <h1 className="title-block__title">
                {children}
                <Link to={link}>
                    <IconInfo className="title-block__ico title-block__ico_info" />
                </Link>
            </h1>
        </div>
    )
}

Title.propTypes = {
  anchor: PropTypes.string,
};

export default Title
