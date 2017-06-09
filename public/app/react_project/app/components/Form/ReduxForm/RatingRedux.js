import React from 'react';
import Rating from 'components/Rating';

const RatingRedux = ({ input, ...props }) => (
    <Rating
        {...props}
        value={input.value}
        onChange={(value) => input.onChange(value)}
    />
);

export default RatingRedux;
