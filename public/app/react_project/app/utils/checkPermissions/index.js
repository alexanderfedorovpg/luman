import { PERMISSIONS_MAP } from './constants';


export function isAdmin(group) {
    return group === 1;
}

export default function makeCheckPermissions(userPermissions, admin) {
    /**
     * проверяет разрешения пользователя
     * @param {string} groupName - названия группы разрешений
     * @param {boolean} [checkAll = true] - нужно ли проверить все разрешения,
     * или достаточно, чтобы было хотя бы одно
     * @param {[string]} [permissions] - массив с названиями разрешений
     * @return {boolean} - если нет хоть одного разрешения из переданного массива, то false
     */
    return function checkPermissions(groupName, checkAll = true, permissions) {
        // у админа есть все разрешения
        if (admin) {
            return true;
        }

        const group = PERMISSIONS_MAP[groupName];

        if (!group) {
            return false;
        }

        permissions = permissions || Object.keys(group); // eslint-disable-line no-param-reassign

        const result = permissions.some((perm) => {
            const permName = group[perm];
            const hasPermission = userPermissions[permName];

            return checkAll ? !hasPermission : hasPermission;
        });

        return checkAll ? !result : result;
    };
}
