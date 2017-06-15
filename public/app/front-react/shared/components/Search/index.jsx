import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import InlineSVG from 'components/InlineSVG';

import './style.scss';
import icon from './search.svg';

class Search extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);

        this.state = {
            query: '',
        };
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.props.onSearch && this.state.query) {
            this.props.onSearch(this.state.query);

            (this.props.setOpen||(()=>{}))(false);
        }
    }

    onInputChange(e) {
        this.setState({
            query: e.target.value,
        });
    }

    onSubmitClick(e) {
        if (this.props.open) {
            this.props.setOpen(false);
            return;
        }

        e.preventDefault();
        this.input.focus();
    }

    onInputFocus() {
        this.props.setOpen(true);
    }

    handleClickOutside() {
        this.props.setOpen(false);
    }

    render() {
        const { classNames } = this.props;
        const rootClasses = cn(['search', classNames.root, {
            search_open: this.props.open,
        }]);

        return (
            <div className={rootClasses}>
                <form className="search__form" onSubmit={this.onSubmit}>
                    <input
                        className="search__input-text"
                        ref={(el) => { this.input = el; }}
                        value={this.state.query}
                        onChange={this.onInputChange}
                        onFocus={this.onInputFocus}
                        type="search"
                        placeholder="Поиск по сайту"
                    />
                    <div className="search__wrapper">
                        <button
                            className="search__input-submit"
                            type="submit"
                            onClick={this.onSubmitClick}
                        >
                            <InlineSVG className="search__ico" src={icon} />
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

Search.defaultProps = {
    classNames: {},
};

Search.propTypes = {
    open: PropTypes.bool,
    onSearch: PropTypes.func,
    setSearch: PropTypes.func,
    classNames: PropTypes.shape({
        root: PropTypes.string,
    }),
};

export default enhanceWithClickOutside(Search);

