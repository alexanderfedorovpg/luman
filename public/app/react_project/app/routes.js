// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import makeCheckPermissions, { isAdmin } from 'utils/checkPermissions';
import { makeSelectUserPermissions, makeSelectUserGroup } from 'containers/App/selectors';

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

const selectPermissions = makeSelectUserPermissions();
const selectGroup = makeSelectUserGroup();

export default function createRoutes(store) {
    // Create reusable async injectors using getAsyncInjectors factory
    const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars
    let userPermissions = selectPermissions(store.getState());
    let admin = isAdmin(selectGroup(store.getState()));

    store.subscribe(() => {
        userPermissions = selectPermissions(store.getState());
        admin = isAdmin(selectGroup(store.getState()));
    });

    const checkPermissions = (...args) => makeCheckPermissions(userPermissions, admin)(...args);
    const sagasContext = require.context('./containers', true, /sagas.js$/);

    function mountSagas(requestedSagas) {
        return function (nextState, replace, callback) {
            if (this.loadedSagas) {
                callback();
                return;
            }

            const importModules = Promise.all(
                requestedSagas.map((v) => sagasContext(v))
            );

            importModules.then((sagas) => {
                this.loadedSagas = injectSagas(
                    sagas.reduce((acc, item) => [...acc, ...item.default], [])
                );
                callback();
            });

            importModules.catch(errorLoading);
        };
    }

    function unmountSagas() {
        if (this.loadedSagas) {
            this.loadedSagas.forEach((saga) => saga.cancel());
            delete this.loadedSagas;
        }
    }

    return [
        // Constructor
        {
            path: '/constructor',
            name: 'constructor',
            childRoutes: [
                {
                    path: '/constructor/war',
                    name: 'constructor-war',
                    getComponent(nextState, cb) {
                        const importModules = Promise.all([
                            import('containers/ConstructorPage/News'),
                        ]);

                        const renderRoute = loadModule(cb);

                        importModules.then(([component]) => {
                            renderRoute(component);
                        });

                        importModules.catch(errorLoading);
                    },
                },
                {
                    path: '/constructor/news',
                    name: 'constructor-news',
                    getComponent(nextState, cb) {
                        const importModules = Promise.all([
                            import('containers/ConstructorPage/News'),
                        ]);

                        const renderRoute = loadModule(cb);

                        importModules.then(([component]) => {
                            renderRoute(component);
                        });

                        importModules.catch(errorLoading);
                    },
                },
                {
                    path: '/constructor/noise',
                    name: 'constructor-noise',
                    getComponent(nextState, cb) {
                        const importModules = Promise.all([
                            import('containers/ConstructorPage/Noise'),
                        ]);

                        const renderRoute = loadModule(cb);

                        importModules.then(([component]) => {
                            renderRoute(component);
                        });

                        importModules.catch(errorLoading);
                    },
                },
                {
                    path: '/constructor/broadcast',
                    name: 'constructor-broadcast',
                    getComponent(nextState, cb) {
                        const importModules = Promise.all([
                            import('containers/ConstructorPage/Broadcast'),
                        ]);

                        const renderRoute = loadModule(cb);

                        importModules.then(([component]) => {
                            renderRoute(component);
                        });

                        importModules.catch(errorLoading);
                    },
                },
            ],
            indexRoute: {
                onEnter(nextState, replace, callback) {
                    replace({ pathname: '/constructor/news', state: { redefined: true } });
                    callback();
                },
            },
            onEnter(nextState, replace, callback) {
                if (
                    !checkPermissions('constructor', true, ['getCategories', 'getList'])
                ) {
                    replace({ pathname: '/', state: { redefined: true } });
                    callback();
                    return;
                }

                mountSagas(['./ConstructorPage/sagas.js'])
                    .call(this, nextState, replace, callback);
            },
            onLeave: unmountSagas,
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/ConstructorPage/reducer'),
                    import('containers/ConstructorPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([cReducer, component]) => {
                    injectReducer('constructorPage', cReducer.default);

                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
        },
        // Feed
        {
            path: '/',
            name: 'feed',
            onEnter: mountSagas(['./Help/sagas.js', './FeedPage/sagas.js']),
            onLeave: unmountSagas,
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Help/reducer'),

                    import('containers/FeedPage/reducer'),
                    import('containers/FeedPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then((results) => {
                    const [
                        helpReducer,
                        reducer,
                        component,
                    ] = results;

                    injectReducer('help', helpReducer.default);
                    injectReducer('feedPage', reducer.default);

                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
        },
        // Stats
        {
            path: '/stats',
            name: 'stats',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/StatsPage/reducer'),
                    import('containers/StatsPage/sagas'),
                    import('containers/StatsPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('statsPage', reducer.default);
                    injectSagas(sagas.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
        },
        // NewsList
        {
            path: '/newslist',
            name: 'newslist',
            onEnter(nextState, replace, callback) {
                if (
                    !checkPermissions('news', false, ['getList'])
                ) {
                    replace({ pathname: '/', state: { redefined: true } });
                    callback();
                    return;
                }

                mountSagas(['./NewslistPage/sagas.js'])
                    .call(this, nextState, replace, callback);
            },
            onLeave: unmountSagas,
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/NewslistPage/reducer'),
                    import('containers/NewslistPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('newslistPage', reducer.default);

                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
        },
        // Ready
        {
            path: '/ready',
            name: 'ready',
            onEnter(nextState, replace, callback) {
                if (
                    !checkPermissions('ready', false, ['moderate'])
                ) {
                    replace({ pathname: '/', state: { redefined: true } });
                    callback();
                    return;
                }

                mountSagas(['./ReadyPage/sagas.js'])
                    .call(this, nextState, replace, callback);
            },
            onLeave: unmountSagas,
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/ReadyPage/reducer'),
                    import('containers/ReadyPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('readyPage', reducer.default);

                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            childRoutes: [
                {
                    path: '/ready/:type',
                    name: 'ready-published',
                },
            ],
        },
        // Editor
        {
            path: '/editor',
            name: 'editor',
            onEnter: mountSagas([
                './EditorPage/sagas.js',
                './ImageGallery/sagas.js',
                './NewslistPage/sagas.js',
                './Chat/sagas.js',
            ]),
            onLeave: unmountSagas,
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Chat/reducer'),
                    import('containers/ImageGallery/reducer'),
                    import('containers/EditorPage/reducer'),
                    import('containers/EditorPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then((result) => {
                    const [
                        chatReducer,
                        imageGalleryReducer,
                        editorReducer,
                        component,
                    ] = result;
                    injectReducer('chat', chatReducer.default);
                    injectReducer('imageGallery', imageGalleryReducer.default);
                    injectReducer('editorPage', editorReducer.default);

                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            childRoutes: [
                {
                    path: '/editor/:id',
                    name: 'editor-old',
                },
            ],
        },
        // Programs
        {
            path: '/programs',
            name: 'programsPage',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/ProgramsPage/reducer'),
                    import('containers/ProgramsPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('programsPage', reducer.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            onEnter(nextState, replace, callback) {
                if (!checkPermissions('records', false)) {
                    replace({ pathname: '/', state: { redefined: true } });
                    callback();
                    return;
                }

                mountSagas(['./ProgramsPage/sagas.js'])
                    .call(this, nextState, replace, callback);
            },
            onLeave: unmountSagas,
        },
        // Live
        {
            path: '/live',
            name: 'livePage',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/LivePage/reducer'),
                    import('containers/LivePage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('livePage', reducer.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            onEnter(nextState, replace, callback) {
                if (!checkPermissions('live', false)) {
                    replace({ pathname: '/', state: { redefined: true } });
                    callback();
                    return;
                }

                mountSagas(['./LivePage/sagas.js'])
                    .call(this, nextState, replace, callback);
            },
            onLeave: unmountSagas,
        },
        // CategoriesStats
        {
            path: '/categoriesStatsPage',
            name: 'categoriesStatsPage',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/CategoriesStatsPage/reducer'),
                    import('containers/CategoriesStatsPage/sagas'),
                    import('containers/CategoriesStatsPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('categoriesStatsPage', reducer.default);
                    injectSagas(sagas.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            childRoutes: [
                {
                    path: '/categoriesStatsPage/:type',
                    name: 'categoriesStatsPage',
                },
            ],
        },
        // ArticleUserStats
        {
            path: '/articleUserStatsPage',
            name: 'articleUserStatsPage',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/ArticleUserStatsPage/reducer'),
                    import('containers/ArticleUserStatsPage/sagas'),
                    import('containers/ArticleUserStatsPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('authorsStatsPage', reducer.default);
                    injectSagas(sagas.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            childRoutes: [
                {
                    path: '/articleUserStatsPage/:type',
                    name: 'articleUserStatsPage',
                },
            ],
        },
        // Translation
        {
            path: '/translation',
            name: 'translation',
            childRoutes: [
                {
                    path: '/translation/:id',
                    name: 'translation-detail',
                },
            ],
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Chat/reducer'),
                    import('containers/TranslationPage/reducer'),
                    import('containers/TranslationPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([chatReducer, translationReducer, component]) => {
                    injectReducer('chat', chatReducer.default);
                    injectReducer('translationPage', translationReducer.default);

                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            onEnter: mountSagas(['./TranslationPage/sagas.js', './Chat/sagas.js']),
            onLeave: unmountSagas,
        },
        // Profile
        {
            path: '/profile',
            name: 'profilePage',
            childRoutes: [
                {
                    path: '/profile/account',
                    name: 'profileAccount',
                    getComponent(nextState, cb) {
                        const importModules = Promise.all([
                            import('containers/ProfilePage/Account'),
                        ]);

                        const renderRoute = loadModule(cb);

                        importModules.then(([component]) => {
                            renderRoute(component);
                        });

                        importModules.catch(errorLoading);
                    },
                },
                {
                    path: '/profile/history',
                    name: 'profileHistory',
                    getComponent(nextState, cb) {
                        const importModules = Promise.all([
                            import('containers/ProfilePage/History'),
                        ]);

                        const renderRoute = loadModule(cb);

                        importModules.then(([component]) => {
                            renderRoute(component);
                        });

                        importModules.catch(errorLoading);
                    },
                },
            ],
            indexRoute: {
                onEnter(nextState, replace, callback) {
                    replace({ pathname: '/profile/account', state: { redefined: true } });
                    callback();
                },
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/ProfilePage/reducer'),
                    import('containers/ProfilePage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('profilePage', reducer.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            onEnter: mountSagas(['./ProfilePage/sagas.js']),
            onLeave: unmountSagas,
        },
        // Edition
        {
            path: '/edition',
            name: 'editionPage',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/EditionPage/reducer'),
                    import('containers/EditionPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('editionPage', reducer.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
            onEnter(nextState, replace, callback) {
                if (
                    !checkPermissions('user', false, ['edit', 'getList']) &&
                    !checkPermissions('history', true, ['getList'])
                ) {
                    replace({ pathname: '/', state: { redefined: true } });
                    callback();
                    return;
                }

                mountSagas(['./EditionPage/sagas.js'])
                    .call(this, nextState, replace, callback);
            },
            onLeave: unmountSagas,
            childRoutes: [
                {
                    path: '/edition/users',
                    name: 'edition-users',
                    getComponent(nextState, cb) {
                        const importModules = Promise.all([
                            import('containers/EditionPage/Users'),
                        ]);

                        const renderRoute = loadModule(cb);

                        importModules.then(([component]) => {
                            renderRoute(component);
                        });

                        importModules.catch(errorLoading);
                    },
                    onEnter(nextState, replace) {
                        if (!checkPermissions('user', false, ['edit', 'getList'])) {
                            replace({ pathname: '/', state: { redefined: true } });
                        }
                    },
                },
                {
                    path: '/edition/groups',
                    name: 'edition-groups',
                    getComponent(nextState, cb) {
                        const importModules = Promise.all([
                            import('containers/EditionPage/Groups'),
                        ]);

                        const renderRoute = loadModule(cb);

                        importModules.then(([component]) => {
                            renderRoute(component);
                        });

                        importModules.catch(errorLoading);
                    },
                    onEnter(nextState, replace) {
                        if (!admin) {
                            replace({ pathname: '/', state: { redefined: true } });
                        }
                    },
                },
                {
                    path: '/edition/journal',
                    name: 'profileJournal',
                    getComponent(nextState, cb) {
                        const importModules = Promise.all([
                            import('containers/EditionPage/Journal'),
                        ]);

                        const renderRoute = loadModule(cb);

                        importModules.then(([component]) => {
                            renderRoute(component);
                        });

                        importModules.catch(errorLoading);
                    },
                    onEnter(nextState, replace) {
                        if (!checkPermissions('history', true, ['getList'])) {
                            replace({ pathname: '/', state: { redefined: true } });
                        }
                    },
                },
            ],
            indexRoute: {
                onEnter(nextState, replace, callback) {
                    if (checkPermissions('user', false, ['edit', 'getList'])) {
                        replace({ pathname: '/edition/users', state: { redefined: true } });
                        callback();
                    } else if (checkPermissions('history', true, ['getList'])) {
                        replace({ pathname: '/edition/journal', state: { redefined: true } });
                        callback();
                    } else {
                        replace({ pathname: '/', state: { redefined: true } });
                        callback();
                    }
                },
            },
        },
        {
            path: '*',
            name: 'notfound',
            getComponent(nextState, cb) {
                import('containers/NotFoundPage')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            },
        },
    ];
}

