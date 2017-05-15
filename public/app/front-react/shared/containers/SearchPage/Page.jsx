import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

import { search } from 'actions/search';
import { makeGetSearchResults } from 'selectors/search';
import BigSearch from 'components/BigSearch';
import AsideContainer from 'containers/Aside';
import Tabs from 'components/Tabs';
import SearchResultList from 'components/SearchResultList';
import { TABS_DATA } from './constants';
import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class SearchPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
        };

        this.onSearch = this.onSearch.bind(this);
    }

    componentWillMount() {
        const parsed = queryString.parse(this.props.location.search);

        this.setState({
            query: parsed.query,
        });
    }

    componentDidMount() {
        if (!this.state.query) {
            return;
        }

        this.props.search(this.state.query);
    }

    onSearch(query) {
        this.props.search(query);
        this.props.history.push({
            search: `?query=${query}`,
        });
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Поиск</title>
                </Helmet>

                <div className="inner-wrapper">
                    <div className="p-search">
                        <div className="p-search__container container">
                            <div className="p-search__left p-search__left--margin left-col left-col_width_inner">
                                <h1>Результаты поиска</h1>
                                <BigSearch
                                    onSearch={this.onSearch}
                                    initialQuery={this.state.query}
                                />
                                <Tabs
                                    data={TABS_DATA}
                                    active={0}
                                    classNames={{ root: 'p-search__breadcrumb' }}
                                />
                                <SearchResultList
                                    classNames={{ root: 'p-search__global-search-result' }}
                                    items={this.props.results}
                                />
                            </div>
                            <div className="p-search__right right-col">
                                <AsideContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    results: makeGetSearchResults(),
});

export default withRouter(connect(mapStateToProps, { search })(SearchPage));
