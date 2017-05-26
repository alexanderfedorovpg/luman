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

import { PERMISSIONS_MAP } from './constants';

const withPermissions = (WrappedComponent) => {
    function getDisplayName() {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }

    // eslint-disable-next-line react/prefer-stateless-function
    class WithPermissions extends PureComponent {
        constructor(props) {
            super(props);

            this.redirect = ::this.redirect;
            this.checkPermissions = ::this.checkPermissions;
        }

        redirect(path) {
            this.props.router.push(path);
        }

        /**
         * проверяет разрешения пользователя
         * @param {string} groupName - названия группы разрешений
         * @param {[string]} [permissions] - массив с названиями разрешений
         * @return {boolean} - если нет хоть одного разрешения из переданного массива, то false
         */
        checkPermissions(groupName, permissions) {
            const group = PERMISSIONS_MAP[groupName];

            if (!group) {
                return false;
            }

            permissions = permissions || Object.keys(group); // eslint-disable-line no-param-reassign

            return !permissions.some((perm) => {
                const permName = group[perm];
                return !this.props.permissions[permName];
            });
        }

        render() {
            const { group, ...props } = this.props;

            return (
                <WrappedComponent
                    admin={group === 1}
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
