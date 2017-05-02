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
import { getNews, newsToLive } from './actions';
import Header from './Header';
import Details from './Details';

export class LivePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.getNews();
    }

    render() {
        const { news, menuOpen } = this.props;
        const { live, selected } = this.props.LivePage;
        return (
            <div>
                <Helmet title="Прямой эфир" />
                <Header moved={menuOpen} live={live} />
                <Wrap>
                    <NewsList
                        active={selected}
                        action={this.props.newsToLive}
                        actionText={live ? null : 'В прямой эфир'}
                        items={news}
                    />
                    <Details />
                </Wrap>
            </div>
        );
    }
}

LivePage.propTypes = {
    LivePage: PropTypes.object,
    news: PropTypes.array,
    getNews: PropTypes.func,
    newsToLive: PropTypes.func,
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
        newsToLive: (id) => dispatch(newsToLive(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LivePage);
