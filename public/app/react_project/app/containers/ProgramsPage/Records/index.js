import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Waypoint from 'react-waypoint';
import RecordsList from 'components/Records';
import {
    makeGetAllRecordsUploaded,
    makeGetLoadingState,
    makeGetRecords,
} from '../selectors';
import {
    loadRecords,
    wantDeleteRecord,
    startEditRecord,
    playVideo,
} from '../actions';
import { Preloader } from './style';

const Records = ({ loading, allUploaded, records, ...props }) => (
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
                <Preloader>Загрузка...</Preloader> :
                !allUploaded &&
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
    allUploaded: PropTypes.bool,
    loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    allUploaded: makeGetAllRecordsUploaded(),
    loading: makeGetLoadingState(),
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
