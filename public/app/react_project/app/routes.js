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
                    path: '/constructor/news',
                    name: 'constructor-news',
                    getComponent(nextState, cb) {
                        const importModules = Promise.all([
                            import('containers/ConstructorPage/News'),
                        ]);

                        const renderRoute = loadModule(cb);

                        importModules.then(([component]) => {
                            renderRoute(component)
                        });

                        importModules.catch(errorLoading);
                    }
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
                            renderRoute(component)
                        });

                        importModules.catch(errorLoading);
                    }
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
                            renderRoute(component)
                        });

                        importModules.catch(errorLoading);
                    },
                }
            ],
            indexRoute: {
                onEnter(nextState, replace, callback) {
                    replace('/constructor/news')
                    callback()
                }
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
                    injectReducer('programsPage', pReducer.default)
                    injectReducer('constructorPage', cReducer.default)

                    renderRoute(component)
                });

                importModules.catch(errorLoading);
            },
        },
        {
            path: '/feed',
            name: 'feed',

            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Help/reducer'),
                    import('containers/Help/sagas'),

                    import('containers/FeedPage/reducer'),
                    import('containers/FeedPage/sagas'),
                    import('containers/FeedPage'),
                ])

                const renderRoute = loadModule(cb)

                importModules.then(results => {
                    let [
                        helpReducer,
                        helpSagas,
                        reducer,
                        sagas,
                        component
                    ] = results

                    injectReducer('help', helpReducer.default)
                    injectReducer('feedPage', reducer.default)
                    injectSagas(sagas.default)
                    injectSagas(helpSagas.default)

                    renderRoute(component)
                });

                importModules.catch(errorLoading)
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
                    injectReducer('newslistPage', reducer.default)

                    renderRoute(component)
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
                    injectReducer('readyPage', reducer.default)

                    renderRoute(component)
                });

                importModules.catch(errorLoading);
            },
        },
        {
            path: '/editor',
            name: 'editor',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }

                const importModules = System.import('containers/EditorPage/sagas');

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
                    import('containers/EditorPage/reducer'),
                    import('containers/EditorPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('editorPage', reducer.default)

                    renderRoute(component)
                });

                importModules.catch(errorLoading);
            },
            childRoutes: [
                {
                    path: '/editor/:id',
                    name: 'editor-old'
                }
            ]
        },
        {
            path: '/programs',
            name: 'programsPage',
                getComponent(nextState, cb) {
                    const importModules = Promise.all([
                    import('containers/ProgramsPage/reducer'),
                    import('containers/ProgramsPage/sagas'),
                    import('containers/ProgramsPage'),
                    ]);

                    const renderRoute = loadModule(cb);

                    importModules.then(([reducer, sagas, component]) => {
                        injectReducer('programsPage', reducer.default);
                        injectSagas(sagas.default);
                        renderRoute(component);
                    });

                    importModules.catch(errorLoading);
                },
        },
        {
            path: '/live',
            name: 'livePage',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/LivePage/reducer'),
                    import('containers/LivePage/sagas'),
                    import('containers/LivePage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('livePage', reducer.default);
                    injectSagas(sagas.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
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
                    name: 'categoriesStatsPage'
                }
            ]
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
                    name: 'articleUserStatsPage'
                }
            ]
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
