/**
*
* Switch
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
    Wrapper,
    Input,
    Label,
    Widget,
} from './style';

function Switch({ labels, disabled, checked, activePosition, ...props }) {
    const styledProps = { disabled, checked };

    return (
        <Wrapper>
            <Label {...styledProps} on={labels.length > 1}>{labels[0]}</Label>
            <Widget activePosition={activePosition} {...styledProps}>
                <Input disabled={disabled} checked={checked} {...props} />
            </Widget>
            {
                !!labels[1] &&
                <Label {...styledProps} off>{labels[1]}</Label>
            }
        </Wrapper>
    );
}

Switch.defaultProps = {
    activePosition: 'right',
};

Switch.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool,
    activePosition: PropTypes.oneOf(['right', 'left']),
    checked: PropTypes.bool,
};

export default Switch;
