import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

import BigSearch from 'components/BigSearch';

// eslint-disable-next-line react/prefer-stateless-function
class SearchPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
        };
    }

    componentWillMount() {
        const parsed = queryString.parse(this.props.location.search);

        this.setState({
            query: parsed.query,
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
                            </div>
                            <BigSearch initialQuery={this.state.query} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SearchPage);
