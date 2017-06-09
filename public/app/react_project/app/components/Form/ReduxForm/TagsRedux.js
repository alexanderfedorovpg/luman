import React from 'react';
import { fromJS } from 'immutable';
import Tags from 'components/Tags';

const TagsRedux = ({ input, ...props }) => (
    <Tags
        {...props}
        value={input.value.toJS()}
        onChange={(checked) => input.onChange(fromJS(checked))}
    />
);

export default TagsRedux;
