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

            const admin = isAdmin(props.group);

            this.state = {
                admin,
            };

            this.redirect = ::this.redirect;
            this.checkPermissions = makeCheckPermissions(props.permissions, admin);
        }

        componentWillReceiveProps(newProps) {
            const admin = isAdmin(newProps.group);
            const permissionsChanged = newProps.permissions !== this.props.permissions;

            if (permissionsChanged) {
                this.checkPermissions = makeCheckPermissions(newProps.permissions, admin);
            }

            if (admin !== this.state.admin) {
                this.setState({
                    admin,
                });
            // нужны вызвать ререндер, если разрешения изменились
            } else if (permissionsChanged) {
                this.forceUpdate();
            }
        }

        redirect(path) {
            this.props.router.push(path);
        }

        render() {
            return (
                <WrappedComponent
                    admin={this.state.admin}
                    checkPermissions={this.checkPermissions}
                    redirect={this.redirect}
                    {
                        ...omit(this.props, [
                            'router', 'params', 'location', 'routes', 'group', 'permissions'
                        ])
                    }
                />
            );
        }
    }

    WithPermissions.propTypes = {
        router: PropTypes.object,
        group: PropTypes.number,
        permissions: PropTypes.object,
    };

    // копируем статиечские методы и свойства класса
    hoistNonReactStatic(WithPermissions, WrappedComponent);

    WithPermissions.displayName = `WithPermissions(${getDisplayName(WrappedComponent)})`;

    const mapStateToProps = createStructuredSelector({
        permissions: makeSelectUserPermissions(),
        group: makeSelectUserGroup(),
    });

    return withRouter(connect(mapStateToProps)(WithPermissions));
};

export default withPermissions;
