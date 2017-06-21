/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import reactTreeWalker from 'react-tree-walker'
import { AsyncComponentProvider } from 'react-async-component';
import { Provider } from 'react-redux';
import configureStore from 'shared/redux/configureStore';

import './polyfills';

import ReactHotLoader from './components/ReactHotLoader';
import ScrollToTop from './components/ScrollToTop';
import App from 'shared/containers/App';

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
const supportsHistory = 'pushState' in window.history;

// Get any rehydrateState for the async components.
// eslint-disable-next-line no-underscore-dangle
const asyncComponentsRehydrateState = window.__ASYNC_COMPONENTS_REHYDRATE_STATE__;

const store = configureStore(
  // Server side rendering would have mounted our state on this global.
  window.__APP_STATE__, // eslint-disable-line no-underscore-dangle
);

store.runSaga();

/**
 * Renders the given React Application component.
 */
function renderApp(TheApp) {
  // Firstly, define our full application component, wrapping the given
  // component app with a browser based version of react router.
  const app = (
    <ReactHotLoader>
      <AsyncComponentProvider rehydrateState={asyncComponentsRehydrateState}>
        <BrowserRouter forceRefresh={!supportsHistory}>
          <ScrollToTop>
            <Provider store={store}>
              <TheApp />
            </Provider>
          </ScrollToTop>
        </BrowserRouter>
      </AsyncComponentProvider>
    </ReactHotLoader>
  );

  // We use the react-async-component in order to support code splitting of
  // our bundle output. It's important to use this helper.
  // @see https://github.com/ctrlplusb/react-async-component
  reactTreeWalker(
    app,
    (element, instance) => {
      if (
        instance &&
        instance.constructor.name === 'AsyncComponent' &&
        typeof instance.asyncBootstrap === 'function'
      ) {
        return instance.asyncBootstrap()
      }
      return true
    },
    {}
  ).then(() => render(app, container));
}

// Execute the first render of our app.
renderApp(App);

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');

// SW disabled, so remove previously added service workers
require('./unregisterServiceWorker');

// The following is needed so that we can support hot reloading our application.
if (process.env.BUILD_FLAG_IS_DEV === 'true' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept('shared/containers/App/index.jsx', () => {
    renderApp(require('shared/containers/App/index.jsx').default);
  });
}
