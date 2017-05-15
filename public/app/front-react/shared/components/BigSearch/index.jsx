import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'components/InlineSVG';

import './style.scss';
import icon from './cross.svg';

class BigSearch extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            query: this.props.initialQuery,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.reset = this.reset.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.props.onSearch) {
            this.props.onSearch(this.state.query);
        }
    }

    onInputChange(e) {
        this.setState({
            query: e.target.value,
        });
    }

    reset() {
        this.setState({
            query: '',
        });
    }

    render() {
        return (
            <div className="global-search">
                <form onSubmit={this.onSubmit} className="global-search__form">
                    <div className="global-search__input-wrapper">
                        <input
                            className="global-search__text"
                            type="search"
                            onChange={this.onInputChange}
                            value={this.state.query}
                        />
                        <button
                            className="global-search__clear"
                            type="reset"
                            onClick={this.reset}
                        >
                            <InlineSVG className="global-search__icon" src={icon} />
                        </button>
                    </div>
                    <button
                        className="global-search__go"
                        type="submit"
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}

BigSearch.defaultProps = {
    initialQuery: '',
};

BigSearch.propTypes = {
    initialQuery: PropTypes.string,
    onSearch: PropTypes.func,
};

export default BigSearch;
