import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import {
    selectNoise,
    selectRelated,
    selectTop,
    selectTopData,
    selectTopPagination,
    selectTopRubric,
    makeSelectHomeNewsByCategory,
} from 'selectors/news';
import { selectRubrics } from 'selectors/rubrics';
import { selectBroadcast } from 'selectors/broadcast';

import {
    fetchTop,
    fetchHome,
    fetchMoreTop,
    fetchNoise,
    fetchRelated,
    setTopRubric,
} from 'actions/news';
import { fetch as fetchRecords } from 'actions/broadcast';

import Detail from 'components/NewsDetail';
import News from 'components/News/Page';

class NewsPage extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { match } = this.props;

        this.props.fetchTop();
        this.props.fetchHome();
        this.props.fetchNoise();
        this.props.fetchRecords();

        if (match.params.code) {
            this.fetchItem(this.getId());
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.code !== nextProps.match.params.code) {
            if (nextProps.match.params.code) {
                this.fetchItem(this.getId(nextProps.match.params.code));
            }
        }
    }

    /**
     * вернет ид новости
     */
    getId(code = false) {
        const { match } = this.props;
        if(code) return +code.match(/^(\d)+/)[0]
        if (match.params.code){
            let id = +match.params.code.match(/^(\d)+/)[0]
            return id
        }else{
            return null;
        }
    }
    // загружает новость, если ее нет в списке
    // также загружает "новости по теме"
    fetchItem(id) {
        if (!this.getById(id)) {
            this.props.fetchTop({ id });
        }
        this.props.fetchRelated(id);
    }

    getById(id) {
        const { topData } = this.props;
        return topData[id];
    }

    render() {
        const {
            noise,
            news,
            match,
            relatedNews,
            broadcast,
            pagination,
            rubrics,
            loadMore,
            setTopRubric,
            currentRubric,
            homeToday,
            homeNow,
        } = this.props;
        const item = this.getById(this.getId()) || {};
        const r = [{ id: null, name: 'Все новости' }, ...rubrics];
        const now = homeNow.map(v => v.news);
        const today = homeToday.map(v => v.news);

        return (
            <div>
                <Helmet>
                    <title>
                        {match.params.code
                            ? `Новости - ${item.title || ''}`
                            : 'Новости'
                        }
                    </title>
                </Helmet>

                {match.params.code
                    ? (
                        <Detail
                            data={item}
                            hasVideo={item.top > 3 || item.video_stream}
                            noise={noise}
                            now={now}
                            related={relatedNews}
                            broadcast={broadcast}
                        />
                    )
                    : (
                        <News
                            now={now}
                            today={today}
                            news={news}
                            setRubric={setTopRubric}
                            rubrics={r}
                            rubric={currentRubric}
                            onLoadRequest={loadMore}
                            canLoad={pagination.page < pagination.lastPage}
                        />
                    )
                }
            </div>
        );
    }
}

const selectHomeToday = makeSelectHomeNewsByCategory(2);
const selectHomeNow = makeSelectHomeNewsByCategory(1);

const mapStateToProps = state => ({
    noise: selectNoise(state),
    topData: selectTopData(state),
    pagination: selectTopPagination(state),
    news: selectTop(state),
    relatedNews: selectRelated(state),
    broadcast: selectBroadcast(state),
    rubrics: selectRubrics(state),
    currentRubric: selectTopRubric(state),
    homeToday: selectHomeToday(state),
    homeNow: selectHomeNow(state),
});

const mapDispatchToProps = dispatch => ({
    fetchTop(params) {
        dispatch(fetchTop(params));
    },
    fetchNoise(params) {
        dispatch(fetchNoise(params));
    },
    fetchHome() {
        dispatch(fetchHome());
    },
    fetchRelated(id) {
        dispatch(fetchRelated(id));
    },
    fetchRecords() {
        dispatch(fetchRecords());
    },
    loadMore() {
        dispatch(fetchMoreTop());
    },
    setTopRubric(id) {
        dispatch(setTopRubric(id));
        dispatch(fetchTop());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
