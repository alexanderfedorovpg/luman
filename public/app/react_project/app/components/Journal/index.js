import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, StyledTable, MoreLink } from './style';

class Journal extends PureComponent {
    constructor(props) {
        super(props);

        this.onMoreLinkClick = this.onMoreLinkClick.bind(this);
    }

    componentDidMount() {
        if (this.props.history.length) {
            return;
        }

        this.props.getHistory();
    }

    onMoreLinkClick(e) {
        e.preventDefault();
        this.props.getHistory();
    }

    render() {
        const { history, allHistoryLoaded, uploadNum, sort, header, onSort } = this.props;

        return (
            <Wrapper>
                <StyledTable
                    {...sort}
                    header={header}
                    body={history}
                    onSort={onSort}
                    sortable
                />
                {
                    !allHistoryLoaded &&
                    (
                        <MoreLink href="#" onClick={this.onMoreLinkClick}>
                            Показать еще {uploadNum} записей
                        </MoreLink>
                    )
                }
            </Wrapper>
        );
    }
}

Journal.defaultProps = {
    uploadNum: 10,
};

Journal.propTypes = {
    header: PropTypes.array,
    history: PropTypes.array,
    allHistoryLoaded: PropTypes.bool,
    uploadNum: PropTypes.number,
    sort: PropTypes.shape({
        sortDirection: PropTypes.oneOf(['up', 'down']),
        sortIndex: PropTypes.number,
    }),
    getHistory: PropTypes.func,
    onSort: PropTypes.func,
};

export default Journal;
