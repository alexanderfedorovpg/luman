import React from 'react';
import { List } from 'immutable';
import { Checkbox } from '../';

const CheckboxGroupRedux = ({ input, meta, value, ...props }) => (
    <Checkbox
        {...props}
        checked={input.value.indexOf(value) !== -1}
        value={value}
        onChange={(e) => {
            const oldValue = input.value || List();
            let newValue;

            if (e.target.checked) {
                newValue = oldValue.push(value);
            } else {
                newValue = oldValue.delete(oldValue.indexOf(value));
            }

            return input.onChange(newValue);
        }}
    />
);

export default CheckboxGroupRedux;
