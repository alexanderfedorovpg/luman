import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import stubImage from './stub.png';

import {
    selectNoise,
    selectRelated,
} from 'selectors/news';
import {
    selectProgram,
    selectCanLoad,
    selectBroadcast,
    selectBroadcastData,
} from 'selectors/broadcast';
import { selectPrograms } from 'selectors/programs';

import { fetchNoise, fetchRelated } from 'actions/news';
import { fetch, fetchMore, setProgram, changeDateFilter } from 'actions/broadcast';

import Detail from 'components/NewsDetail';
import Broadcast from 'components/Broadcast/Programs/index.jsx';
import BroadcastStub from 'components/Broadcast/Page/stub.jsx';

const SHOW_STUB = false; // показываем заглушку
const fetchPayload = {
    params: {
        limit: 15,
    },
    replace: true,
};

class BroadcastProgramsPage extends PureComponent {

    constructor(props) {
        super(props);

        this.toPrograms = this.toPrograms.bind(this);
    }

    asyncBootstrap() {
        const { match } = this.props;
        const programId = match.params.id;
        if (programId) {
            this.props.setProgram(programId);
        } else {
            this.props.fetch(fetchPayload);
        }
        this.props.fetchNoise();
    }

    componentDidMount() {
        this.asyncBootstrap()
    }

    getById(id) {
        const { broadcastData } = this.props;

        return broadcastData[id];
    }

    toPrograms(id) {
        const { history, setProgram } = this.props;

        if (id) {
            setProgram(id);
            history.push({
                pathname: `/programs/${id}`,
            });
        } else {
            history.push({
                pathname: '/broadcast',
            });
        }
    }

    render() {
        const {
            match,
            broadcast,
            noise,
            relatedNews,
            program,
            programs,
            canLoad,
            setProgram,
            loadMore,
        } = this.props;
        const item = this.getById(match.params.id) || {};

        if (SHOW_STUB) {
            return (
                <div>
                    <Helmet>
                        <title>Из эфира</title>
                    </Helmet>
                    <BroadcastStub stubImage={stubImage} />
                </div>
            );
        }
        return (
                <div>
                    <Helmet>
                        <title>Из эфира</title>
                    </Helmet>

                    {!match.params.id
                        ?
                        null
                        :
                        <Broadcast
                            dataId={match.params.id}
                            broadcast={broadcast}
                            onLoadRequest={loadMore}
                            onFilter={this.props.changeDateFilter}
                            canLoad={canLoad}
                            setProgram={this.toPrograms}
                            programs={programs}
                        />
                    }
                </div>
            );
    }
}

const mapStateToProps = state => ({
    broadcast: selectBroadcast(state),
    broadcastData: selectBroadcastData(state),
    programs: selectPrograms(state),
    program: selectProgram(state),
    canLoad: selectCanLoad(state),
    relatedNews: selectRelated(state),
    noise: selectNoise(state),
});

const mapDispatchToProps = dispatch => ({
    fetch(params) {
        dispatch(fetch(params));
    },
    loadMore() {
        dispatch(fetchMore());
    },
    setProgram(id) {
        dispatch(setProgram(id));
        dispatch(fetch(fetchPayload));
    },
    fetchNoise() {
        dispatch(fetchNoise());
    },
    fetchRelated(id) {
        dispatch(fetchRelated(id));
    },
    changeDateFilter(filter) {
        dispatch(changeDateFilter(filter));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(BroadcastProgramsPage);
