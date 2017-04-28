import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from 'components/Constructor/Collapse/Header';
import Collapse from 'components/Constructor/Collapse';

import {
    setWarMode,
    moveItem,
    chooseCategory,
} from '../actions'

import {
    selectWarMode,
    selectHomeNews
} from '../selectors'

export class CollapseContainer extends PureComponent {

    constructor(props) {
        super(props);
    }

    dataByCategory(type, value) {
        switch (type) {
            case 'news':
                return item => value.id == item.category.id

            case 'noise':
                return item => true

            case 'broadcast':
                return item => value.id == item.data.program_id

            default:
                return (v) => v
        }
    }

    groupData() {
        const { categories, type, data } = this.props

        return categories.reduce(
            (acc, cat) => ({
                ...acc,
                [cat.id]: (data[type] || [])
                    .filter(this.dataByCategory(type, cat))
                    .map(v => v.data)
            }),
            {}
        )
    }

    render() {
        let {
            war,
            setWarMode,
            type,
            chooseCategory,
            onRemove,
            moveItem,
            categories,
            data
        } = this.props

        return (
            <div>
                <Header data={data} war={war} onWarModeChange={setWarMode} />
                <Collapse
                    choose={chooseCategory}
                    onRemove={onRemove}
                    onMove={moveItem.bind(this, type)}
                    categories={categories}
                    data={this.groupData()} />
            </div>
        )
    }

}

Collapse.propTypes = {
};

const mapStateToProps = state => ({
    war: selectWarMode(state),
    data: selectHomeNews(state),
})

const mapDispatchToProps = dispatch => ({
    setWarMode(value) {
        dispatch(setWarMode(value));
    },
    chooseCategory(category) {
        dispatch(chooseCategory(category))
    },
    moveItem(type, source, target) {
        dispatch(moveItem(type, source, target))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CollapseContainer);
