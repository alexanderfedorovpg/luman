/**
*
* IconTip
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import { Wrapper } from './style';

function IconTip({ message, eventType, direction, icon, onClick, ...props }) {
    return (
        <Wrapper {...props} message={message} eventType={eventType} direction={direction}>
            <Icon type={icon} onClick={onClick} />
        </Wrapper>
    );
}

IconTip.propTypes = {
    message: PropTypes.string,
    eventType: PropTypes.string,
    direction: PropTypes.string,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default IconTip;
