import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Tags from 'components/Tags';
import { Wrapper } from './style';
import {
    makeSelectProgramsNames,
    makeGetSelectedProgram,
} from '../selectors';
import { changeProgram } from '../actions';

const Programs = ({ selected, programs, ...props }) => (
    <Wrapper>
        {
            !!programs &&
            <Tags
                type="radio"
                data={programs}
                value={[selected]}
                onChange={props.changeProgram}
            />
        }
    </Wrapper>
);

Programs.propTypes = {
    selected: PropTypes.number,
    changeProgram: PropTypes.func,
    programs: Tags.propTypes.data,
};

const mapStateToProps = createStructuredSelector({
    selected: makeGetSelectedProgram(),
    programs: makeSelectProgramsNames(),
});

function mapDispatchToProps(dispatch) {
    return {
        changeProgram: (id) => dispatch(changeProgram(id[0])),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Programs);
