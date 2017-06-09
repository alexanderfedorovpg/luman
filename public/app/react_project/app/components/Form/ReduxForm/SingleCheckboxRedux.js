import React from 'react';
import { Checkbox } from '../';

const SingleCheckboxRedux = ({ input, meta, ...props }) => (
    <Checkbox
        {...props}
        checked={input.checked}
        value={input.value}
        onChange={(e) => input.onChange(e)}
    />
);

export default SingleCheckboxRedux;
