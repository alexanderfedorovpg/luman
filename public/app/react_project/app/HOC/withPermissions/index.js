import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { createStructuredSelector } from 'reselect';
import {
    makeSelectUserPermissions,
    makeSelectUserGroup,
} from 'containers/App/selectors';
import makeCheckPermissions, { isAdmin } from 'utils/checkPermissions';

const withPermissions = (WrappedComponent) => {
    function getDisplayName() {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }

    // eslint-disable-next-line react/prefer-stateless-function
    class WithPermissions extends PureComponent {
        constructor(props) {
            super(props);

            this.redirect = ::this.redirect;
            this.checkPermissions = makeCheckPermissions(this.props.permissions);
        }

        redirect(path) {
            this.props.router.push(path);
        }

        render() {
            const { group, ...props } = this.props;

            return (
                <WrappedComponent
                    admin={isAdmin(group)}
                    checkPermissions={this.checkPermissions}
                    redirect={this.redirect}
                    {...omit(props, ['router', 'params', 'location', 'routes'])}
                />
            );
        }
    }

    WithPermissions.propTypes = {
        router: PropTypes.object,
        group: PropTypes.number,
        permissions: PropTypes.object,
    };

    hoistNonReactStatic(WithPermissions, WrappedComponent);

    WithPermissions.displayName = `WithPermissions(${getDisplayName(WrappedComponent)})`;

    const mapStateToProps = createStructuredSelector({
        permissions: makeSelectUserPermissions(),
        group: makeSelectUserGroup(),
    });

    return withRouter(connect(mapStateToProps)(WithPermissions));
};

export default withPermissions;
