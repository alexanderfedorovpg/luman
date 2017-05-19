import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'utils/style';
import { font } from 'constants/style';
import uniqueId from 'lodash/uniqueId';
import Icon from 'components/Icon';

import tableOpacity from './img/table-opacity.png';

const StyledTable = styled.table`
    width: 100%;
    text-align: left;
    table-layout: fixed;
    white-space: nowrap;

    thead {
        border-bottom: 2px solid #d2d2d2;
    }

    th {
        padding-bottom: 8px;

        color: #4d4d4d;
        font-family: ${font.opensans};
        font-size: 14px;
        font-weight: 700;
        text-align: left;

        ${ifProp('sortable')`
            cursor: pointer;
        `}
    }

    td {
        position: relative;
        white-space: nowrap;
        overflow: hidden;

        height: 51px;
        padding: 0 0 0 2px;

        font-family: ${font.opensans};
        font-size: 14px;
        color: #666666;
        font-weight: 400;

        vertical-align: middle;

        &:after {
            content: ' ';

            position: absolute;
            right: 0;
            top: 1px;
            bottom: 1px;
            width: 50px;
            height: 48px;

            background-image: url(${tableOpacity});
            background-repeat: no-repeat;
            background-size: cover;
        }
    }

    tbody {

        tr {
            border-bottom: 1px solid #e9e9e9;

            &:last-child {
                border-bottom: 0;
            }

            &.active {
                background-color: #f0f0f0;

                td {
                    &:after {
                        display: none;
                    }
                }
            }

            &:hover {
                background-color: #f0f0f0;
                cursor: pointer;

                td {
                    &:after {
                        display: none;
                    }
                }
            }
        }
    }
`;

const SortIcon = styled(Icon)`
    transform: ${({ direction }) => direction === 'down' ? 'none' : 'rotate(-180deg)'}
`;

// eslint-disable-next-line react/prefer-stateless-function
class Table extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            sort: {
                index: props.sortIndex || null,
                direction: props.sortDirection || null,
            },
            data: props.body || [],
        };

        this.onThClick = this.onThClick.bind(this);
        this.sortTable = this.sortTable.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderCell = this.renderCell.bind(this);
        this.renderTh = this.renderTh.bind(this);
    }

    componentWillMount() {
        this.sortTable();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.body === this.props.body) {
            return;
        }

        this.sortTable(newProps.body);
    }

    onThClick(e, index) {
        if (!this.props.sortable) {
            return;
        }

        e.preventDefault();

        if (this.state.sort.index === index) {
            this.toggleSortDirection();
        } else {
            this.changeSortIndex(index);
        }
    }

    sortTable(data = this.state.data, cb) {
        const { sort: { index, direction } } = this.state;
        const newData = [...data].sort((row1, row2) => {
            const toDown = direction === 'down';
            const a = row1.cells[index] === null ? '' : row1.cells[index];
            const b = row2.cells[index] === null ? '' : row2.cells[index];

            if (a > b) {
                return toDown ? -1 : 1;
            } else if (a < b) {
                return toDown ? 1 : -1;
            }

            return 0;
        });

        if (this.props.onSort) {
            this.props.onSort({
                sortDirection: direction,
                sortIndex: index,
            });
        }

        this.setState({
            data: newData,
        }, cb);
    }

    changeSortIndex(index) {
        this.setState({
            sort: {
                ...this.state.sort,
                index,
            },
        }, this.sortTable);
    }

    toggleSortDirection() {
        const newDirection = this.state.sort.direction === 'down' ? 'up' : 'down';

        this.setState({
            sort: {
                ...this.state.sort,
                direction: newDirection,
            },
        }, this.sortTable);
    }

    renderCell(content) {
        return <td key={uniqueId()}>{content}</td>;
    }

    renderRow(data) {
        const { onRowClick } = this.props;

        return (
            <tr
                role="button"
                onClick={(e) => onRowClick(data, e)}
                key={data.id || uniqueId()}
                className={data.active ? 'active' : null}
            >
                {data.cells.map(this.renderCell)}
            </tr>
        );
    }

    renderTh(data, ind) {
        const { sort } = this.state;
        const { columnsWidth } = this.props;

        return (
            <th
                onClick={(e) => this.onThClick(e, ind)}
                role="button"
                key={uniqueId()}
                width={columnsWidth[ind]}
            >
                {data}
                {' '}
                {
                    ind === sort.index &&
                        <SortIcon type="dropdown-arrow" direction={sort.direction} />
                }
            </th>
        );
    }

    renderHeader(data) {
        return (
            <thead>
                <tr>
                    {data.map(this.renderTh)}
                </tr>
            </thead>
        );
    }

    renderBody() {
        return (
            <tbody>
                {this.state.data.map(this.renderRow)}
            </tbody>
        );
    }

    render() {
        const { children, header, ...props } = this.props;
        return (
            <StyledTable {...props} innerRef={(rootEl) => { this.rootEl = rootEl; }}>
                {
                    !!children &&
                    Children.toArray(children)
                }
                {
                    !children && !!header &&
                    this.renderHeader(header)
                }
                {
                    !children &&
                    this.renderBody()
                }
            </StyledTable>
        );
    }
}

Table.defaultProps = {
    columnsWidth: [],
    onRowClick: () => {},
};

Table.propTypes = {
    children: PropTypes.node,
    header: PropTypes.array,
    body: PropTypes.array,
    sortIndex: PropTypes.number,
    sortDirection: PropTypes.oneOf(['up', 'down']),
    sortable: PropTypes.bool,
    onSort: PropTypes.func,
    onRowClick: PropTypes.func,
    columnsWidth: PropTypes.arrayOf(PropTypes.string),
};

export default Table;
