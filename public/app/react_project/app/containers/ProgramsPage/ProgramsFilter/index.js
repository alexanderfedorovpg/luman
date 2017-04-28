import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Tags from 'components/Tags';
import { Wrapper } from './style';
import makeSelectProgramsPage, {
    makeSelectProgramsNames,
} from '../selectors';
import { changeProgram } from '../actions';

const Programs = ({ ProgramsPage: { selectedProgram }, programs, ...props }) => (
    <Wrapper>
        {
            !!programs &&
            <Tags
                type="radio"
                data={programs}
                value={[selectedProgram]}
                onChange={props.changeProgram}
            />
        }
    </Wrapper>
);

Programs.propTypes = {
    ProgramsPage: PropTypes.object,
    changeProgram: PropTypes.func,
    programs: Tags.propTypes.data,
};

const mapStateToProps = createStructuredSelector({
    ProgramsPage: makeSelectProgramsPage(),
    programs: makeSelectProgramsNames(),
});

function mapDispatchToProps(dispatch) {
    return {
        changeProgram: (id) => dispatch(changeProgram(id[0])),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Programs);
