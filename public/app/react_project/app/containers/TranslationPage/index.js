import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { submit } from 'redux-form'

import {
    selectUsersMap,
    selectCurrentUser,
    selectMenuExpandedStatus
} from 'containers/App/selectors'

import Header from 'components/Translation/Header'
import Content from 'components/Translation/Content'

class TranslationPage extends PureComponent {

    render() {
        const { menuOpen, submit } = this.props

        return (
            <div>
                <Helmet
                    title="Текстовая трансляция" />

                <Header moved={menuOpen} onSubmit={submit} />
                <Content />
                {/*<Wrap>
                    <Left>
                        <News
                            data={news}
                            hide={this.hideItem}
                            toWork={this.work}
                            pagination={pagination}
                            loading={loading} />
                    </Left>
                    <Right>
                        <Form
                            data={selectedFeed}
                            users={editors}
                            rubrics={rubrics}
                            onSubmit={this.sendToWork} />
                    </Right>
                </Wrap>*/}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    menuOpen: selectMenuExpandedStatus(state),
})

const mapDispatchToProps = dispatch => ({
    submit() {
        dispatch(submit('translationForm'))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TranslationPage);
