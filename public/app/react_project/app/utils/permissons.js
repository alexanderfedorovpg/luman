import { groups as book } from 'containers/App/constants'

export const checkPermissons = (user, groups) => {
    return groups
        .map(group => user.groups.indexOf(book[group]) > -1)
        .reduce((acc, val) => acc || val, false)
}
