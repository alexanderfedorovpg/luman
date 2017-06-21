import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import Banner from 'components/Banner'

import { search, changeSearchCategory, setInitialState } from 'actions/search';
import {
    makeGetSearchResults,
    makeGetCurrentCategory,
    makeGetQuery,
    makeGetLoading,
} from 'selectors/search';
import BigSearch from 'components/BigSearch';
import Tabs from 'components/Tabs';
import SearchResultList from 'components/SearchResultList';
import AsideContainer from 'containers/Aside';
import Preloader from 'components/Preloader';
import { TABS_DATA } from './constants';
import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class SearchPage extends PureComponent {
    constructor(props) {
        super(props);

        const parsed = queryString.parse(props.location.search);

        this.state = {
            paramsFromUrl: {
                query: parsed.query,
                category: parsed.category || 'all',
            },
        }

        this.onSearch = this.onSearch.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
    }

    asyncBootstrap() {
        const parsed = queryString.parse(this.props.location.search);

        this.props.setInitialState(this.state.paramsFromUrl);
    }

    componentDidMount() {
        this.asyncBootstrap()
    }

    changeUrl(overwriteParams) {
        const params = {
            query: this.props.query,
            category: this.props.category,
            ...overwriteParams,
        };

        this.props.history.push({
            search: `${queryString.stringify(params)}`,
        });
    }

    onSearch(query) {
        this.props.search(query);
        this.changeUrl({ query });
    }

    onCategoryChange(category) {
        this.props.changeSearchCategory(category);
        this.changeUrl({ category });
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
                                    initialQuery={this.state.paramsFromUrl.query}
                                />
                                <Tabs
                                    data={TABS_DATA}
                                    active={this.props.category}
                                    onChange={this.onCategoryChange}
                                    classNames={{ root: 'p-search__breadcrumb' }}
                                />
                                {
                                    this.props.loading ?
                                        <Preloader className="p-search__preloader" /> :
                                        this.props.results.length ?
                                            (
                                                <SearchResultList
                                                    classNames={{ root: 'p-search__global-search-result' }}
                                                    items={this.props.results}
                                                />
                                            ) :
                                            <div className="p-search__preloader">Ничего не найдено :(</div>
                                }
                            </div>
                            <div className="p-search__right right-col">
                                <AsideContainer />
                            </div>
                            <div className="p-search__middle middle-col">
                                <Banner type="preview" className="p-search__banner-preview" />
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
    category: makeGetCurrentCategory(),
    query: makeGetQuery(),
    loading: makeGetLoading(),
});

export default withRouter(connect(
    mapStateToProps,
    { search, changeSearchCategory, setInitialState },
)(SearchPage));
