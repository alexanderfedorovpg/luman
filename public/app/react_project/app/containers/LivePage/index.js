/*
 *
 * LivePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { selectMenuExpandedStatus } from 'containers/App/selectors';
import { Wrap } from 'components/Content';
import { NewsList } from 'components/News';

import makeSelectLivePage, { makeGetNews } from './selectors';
import { getNews, selectNews, getLive } from './actions';
import Header from './Header';
import Details from './Details';

export class LivePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.getLive();
        this.props.getNews();
    }

    render() {
        const { news, menuOpen } = this.props;
        const { live, selected, streamUrl } = this.props.LivePage;
        return (
            <div>
                <Helmet title="Прямой эфир" />
                <Header moved={menuOpen} live={live} />
                <Wrap>
                    <NewsList
                        active={selected}
                        action={this.props.selectNews}
                        actionText={live ? null : 'В прямой эфир'}
                        items={news}
                    />
                    <Details url={streamUrl} />
                </Wrap>
            </div>
        );
    }
}

LivePage.propTypes = {
    LivePage: PropTypes.object,
    news: PropTypes.array,
    getNews: PropTypes.func,
    getLive: PropTypes.func,
    selectNews: PropTypes.func,
    menuOpen: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    LivePage: makeSelectLivePage(),
    menuOpen: selectMenuExpandedStatus,
    news: makeGetNews(),
});

function mapDispatchToProps(dispatch) {
    return {
        getNews: () => dispatch(getNews()),
        selectNews: (id) => dispatch(selectNews(id)),
        getLive: () => dispatch(getLive()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LivePage);
