import React from 'react';
import PropTypes from 'prop-types';
import placeholder from './placeholder.png';

function Img({ src, ...props }) {
    return <img alt="" src={src || placeholder} {...props} />;
}

Img.propTypes = {
    src: PropTypes.string,
};

export default Img;
