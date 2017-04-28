import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Waypoint from 'react-waypoint';
import RecordsList from 'components/Records';
import makeSelectProgramsPage, {
    makeGetRecords,
} from '../selectors';
import {
    loadRecords,
    wantDeleteRecord,
    startEditRecord,
    playVideo,
} from '../actions';

const Records = ({ ProgramsPage: { loading, allRecordsUploaded }, records, ...props }) => (
    <div>
        {
            !!records &&
            <RecordsList
                onPreviewClick={props.playVideo}
                onRecordEdit={props.startEditRecord}
                onRecordDelete={props.deleteRecord}
                items={records}
            />
        }
        {
            loading ?
            'Загрузка...' :
            !allRecordsUploaded &&
            <Waypoint
                bottomOffset="-50%"
                scrollableAncestor={window}
                onEnter={() => props.loadRecords(false)}
            />
        }
    </div>
);

Records.propTypes = {
    records: RecordsList.propTypes.items,
    playVideo: PropTypes.func,
    loadRecords: PropTypes.func,
    startEditRecord: PropTypes.func,
    deleteRecord: PropTypes.func,
    ProgramsPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    ProgramsPage: makeSelectProgramsPage(),
    records: makeGetRecords(),
});

function mapDispatchToProps(dispatch) {
    return {
        loadRecords: (replace) => dispatch(loadRecords(replace)),
        startEditRecord: (id) => dispatch(startEditRecord(id)),
        playVideo: (id) => dispatch(playVideo(id)),
        deleteRecord: (id) => dispatch(wantDeleteRecord(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Records);
