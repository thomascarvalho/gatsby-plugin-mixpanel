import React from 'react'

import { MixpanelProvider, mixpanel } from '.'

const isEnable = options =>
  (process.env.NODE_ENV === `production` || options.enableOnDevMode) &&
  options.apiToken

const trackEvent = (eventName, properties) => {
  if (eventName) mixpanel.track(eventName, properties)
}

const trackPageViews = (location, pageViews) => {
  if (pageViews && location) {
    let eventName
    if (pageViews instanceof Object) {
      eventName = pageViews[location.pathname]
    } else if (pageViews === 'all') {
      eventName = `View page ${location.pathname}`
    }
    trackEvent(eventName, location)
  }
}

exports.onRouteUpdate = ({ location }, pluginOptions) => {
  const options = getOptions(pluginOptions);

  if (!isEnable(options)) {
    return;
  }

  trackPageViews(location, options.pageViews);
};

const getOptions = pluginOptions => {
  const defaultsOptions = {
    apiToken: null,
    enableOnDevMode: true,
    debug: false,
  }
  const options = { ...defaultsOptions, ...pluginOptions }
  return { ...options, isEnable: isEnable(options) }
}

exports.onClientEntry = (skip, pluginOptions) => {
  const options = getOptions(pluginOptions)

  if (!options.isEnable) {
    mixpanel.init('disable', { autotrack: false })
    mixpanel.disable()
    return
  }

  mixpanel.init(options.apiToken, { debug: options.debug })
}

exports.wrapRootElement = ({ element }) => (
  <MixpanelProvider>{element}</MixpanelProvider>
)
