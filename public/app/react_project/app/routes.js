// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

export default function createRoutes(store) {
    // Create reusable async injectors using getAsyncInjectors factory
    const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

    return [
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
                if (this.loadedSagas) {
                    callback();
                    return;
                }

                const importModules = Promise.all([
                    import('containers/ConstructorPage/sagas'),
                    import('containers/ProgramsPage/sagas'),
                ]);

                importModules.then(([constructorSagas, programSagas]) => {
                    this.loadedSagas = injectSagas([
                        ...constructorSagas.default,
                        ...programSagas.default,
                    ]);
                    callback();
                });

                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => saga.cancel());
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/ProgramsPage/reducer'),
                    import('containers/ConstructorPage/reducer'),
                    import('containers/ConstructorPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([pReducer, cReducer, component]) => {
                    injectReducer('programsPage', pReducer.default);
                    injectReducer('constructorPage', cReducer.default);

                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
        },
        {
            path: '/',
            name: 'feed',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }

                const importModules = Promise.all([
                    import('containers/Help/sagas'),
                    import('containers/FeedPage/sagas'),
                ]);

                importModules.then(sagas => {
                    this.loadedSagas = injectSagas(
                        sagas.reduce((acc, item) => [...acc, ...item.default], []));
                    callback();
                });

                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => saga.cancel());
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Help/reducer'),

                    import('containers/FeedPage/reducer'),
                    import('containers/FeedPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then((results) => {
                    let [
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
        {
            path: '/newslist',
            name: 'newslist',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }

                const importModules = System.import('containers/NewslistPage/sagas');

                importModules.then((sagas) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });

                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => saga.cancel());
                    delete this.loadedSagas;
                }
            },
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
        {
            path: '/ready',
            name: 'ready',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }

                const importModules = System.import('containers/ReadyPage/sagas');

                importModules.then((sagas) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });

                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => saga.cancel());
                    delete this.loadedSagas;
                }
            },
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
        {
            path: '/editor',
            name: 'editor',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }

                const importModules = Promise.all([
                    import('containers/EditorPage/sagas'),
                    import('containers/NewslistPage/sagas'),
                    import('containers/Chat/sagas'),
                ]);

                importModules.then(([editorSagas, newslistSagas, chatSagas]) => {
                    this.loadedSagas = injectSagas([
                        ...editorSagas.default,
                        ...newslistSagas.default,
                        ...chatSagas.default,
                    ]);
                    callback();
                });

                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => saga.cancel());
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Chat/reducer'),
                    import('containers/EditorPage/reducer'),
                    import('containers/EditorPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([chatReducer, editorReducer, component]) => {
                    injectReducer('chat', chatReducer.default);
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
                if (this.loadedSagas) {
                    callback();
                    return;
                }

                const importModules = System.import('containers/ProgramsPage/sagas');

                importModules.then((sagas) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });

                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => saga.cancel());
                    delete this.loadedSagas;
                }
            },
        },
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
                if (this.loadedSagas) {
                    callback();
                    return;
                }

                const importModules = System.import('containers/LivePage/sagas');

                importModules.then((sagas) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });

                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => saga.cancel());
                    delete this.loadedSagas;
                }
            },
        },
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
        {
            path: '/translation',
            name: 'translation',
            childRoutes: [
                {
                    path: '/translation/:id',
                    name: 'translation-detail'
                }
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
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }

                const importModules = Promise.all([
                    import('containers/TranslationPage/sagas'),
                    import('containers/Chat/sagas'),
                ]);

                importModules.then(sagas => {
                    this.loadedSagas = injectSagas(
                        sagas.reduce((acc, item) => [...acc, ...item.default], [])
                    );
                    callback();
                });

                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => saga.cancel());
                    delete this.loadedSagas;
                }
            },
        },
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
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }

                const importModules = System.import('containers/ProfilePage/sagas');

                importModules.then((sagas) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });

                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => saga.cancel());
                    delete this.loadedSagas;
                }
            },
        },
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
                if (this.loadedSagas) {
                    callback();
                    return;
                }

                const importModules = System.import('containers/EditionPage/sagas');

                importModules.then((sagas) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });

                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => saga.cancel());
                    delete this.loadedSagas;
                }
            },
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
                },
            ],
            indexRoute: {
                onEnter(nextState, replace, callback) {
                    replace({ pathname: '/edition/users', state: { redefined: true } });
                    callback();
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
