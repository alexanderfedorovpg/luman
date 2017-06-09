import React from 'react';
import Switch from 'components/Switch';
import {  Label } from '../';

const SwitchRedux = ({ input, meta: { touched, error }, showError, ...props }) => (
    <div>
        <Switch
            {...props}
            checked={input.checked}
            value={input.value}
            onChange={(e) => input.onChange(e)}
        />
        {
            touched && showError && error &&
            <Label light error>{error}</Label>
        }
    </div>
);

export default SwitchRedux;
