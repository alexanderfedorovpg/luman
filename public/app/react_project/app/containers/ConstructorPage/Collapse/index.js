import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Header from 'components/Constructor/Collapse/Header';
import Wrap from 'components/Constructor/Collapse/Wrap';
import Collapse from 'components/Constructor/Collapse';

import {
    setOption,
    moveItem,
    removeFromMain,
    itemToMain,
    chooseCategory,
} from '../actions'

import {
    selectWarMode,
    selectWarTitle,
    selectHomeNews
} from '../selectors'

export class CollapseContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.setWarMode = ::this.setWarMode
    }

    dataByCategory(type, value) {
        switch (type) {
            case 'news':
            case 'war':
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

    setWarMode(value) {
        const { type, dispatch } = this.props

        dispatch(setOption('war', value));

        if (!value && type == 'war' ) {
            dispatch(push('/constructor/news'));
        }
    }

    render() {
        let {
            war,
            warTitle,
            setWarMode,
            setTitle,
            showTitle,
            type,
            chooseCategory,
            onRemove,
            moveItem,
            categories,
            data,
            push
        } = this.props

        return (
            <Wrap>
                <Header data={data} war={war} onWarModeChange={this.setWarMode} />
                <Collapse
                    warTitle={warTitle}
                    setTitle={setTitle}
                    showTitle={showTitle}
                    choose={chooseCategory}
                    onRemove={onRemove}
                    onMove={moveItem.bind(this, type)}
                    categories={categories}
                    data={this.groupData()}
                    push={push}/>
            </Wrap>
        )
    }

}

Collapse.propTypes = {
};

const mapStateToProps = state => ({
    war: selectWarMode(state),
    warTitle: selectWarTitle(state),
    data: selectHomeNews(state),
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    setTitle(value) {
        dispatch(setOption('title', value));
    },
    chooseCategory(category) {
        dispatch(chooseCategory(category))
    },
    moveItem(type, source, target, category) {
        dispatch(removeFromMain(source, type))
        dispatch(itemToMain(source, type, category.id, target && target.id))
    },
    push(path) {
        dispatch(push(path))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CollapseContainer);
