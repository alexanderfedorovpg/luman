import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import reactGA from 'react-ga';
import ym from 'react-yandex-metrika';
import ymInit from 'react-yandex-metrika/lib/init';

import config from 'config';

if (process.env.BUILD_FLAG_IS_DEV === 'false') {
  config('analytics.google') && reactGA.initialize(config('analytics.google'));
  config('analytics.yandex') && ymInit([config('analytics.yandex')]);
}

class Metrics extends Component {

  componentDidMount() {
    this.updateInfo(this.props.location);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.updateInfo(this.props.location);
    }
  }

  updateInfo(location) {
    if (process.env.BUILD_FLAG_IS_DEV === 'false') {
      if (config('analytics.google')) {
        reactGA.set({ page: location.pathname + location.search });
        reactGA.pageview(location.pathname + location.search);
      }

      if (config('analytics.yandex')) {
        ym('hit', location.pathname + location.search);
      }
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(Metrics)
