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

const Records = ({ loading, allUploaded, records, checkPermissions, ...props }) => {
    const canDelete = checkPermissions('records', true, ['delete']);
    const canEdit = checkPermissions('records', true, ['edit']);

    return (
        <div>
            {
                !!records &&
                <RecordsList
                    onPreviewClick={props.playVideo}
                    onRecordEdit={canEdit ? props.startEditRecord : null}
                    onRecordDelete={canDelete ? props.deleteRecord : null}
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
};

Records.propTypes = {
    allUploaded: PropTypes.bool,
    checkPermissions: PropTypes.func,
    deleteRecord: PropTypes.func,
    loading: PropTypes.bool,
    loadRecords: PropTypes.func,
    playVideo: PropTypes.func,
    records: RecordsList.propTypes.items,
    startEditRecord: PropTypes.func,
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
