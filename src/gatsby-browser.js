import React from 'react'

import { MixpanelProvider, mixpanel } from '.'

function isEnable(options) {
  return (process.env.NODE_ENV === `production` || options.enableOnDevMode) &&
  options.apiToken
}

function trackEvent(eventName, properties) {
  if (eventName) mixpanel.track(eventName, properties)
}

function trackPageViews(location, pageViews, trackPageViewsAs) {
  if (pageViews && location) {
    let eventName
    if (pageViews instanceof Object) {
      eventName = pageViews[location.pathname]
    } else if (trackPageViewsAs) {
      eventName = trackPageViewsAs
    } else if (pageViews === 'all') {
      eventName = `View page ${location.pathname}`
    }
    trackEvent(eventName, location)
  }
}

function getOptions(pluginOptions) {
  const defaultsOptions = {
    apiToken: null,
    enableOnDevMode: true,
    mixpanelConfig: null,
    trackPageViewsAs: null,
  }
  const options = { ...defaultsOptions, ...pluginOptions }
  return { ...options, isEnable: isEnable(options) }
}

exports.onRouteUpdate = ({ location }, pluginOptions) => {
  const options = getOptions(pluginOptions)

  if (!isEnable(options)) {
    return
  }

  trackPageViews(location, options.pageViews, options.trackPageViewsAs)
}

exports.onClientEntry = (skip, pluginOptions) => {
  const options = getOptions(pluginOptions)

  if (!options.isEnable) {
    mixpanel.init('disable', { autotrack: false })
    mixpanel.disable()
    return
  }

  mixpanel.init(
    options.apiToken,
    Object.assign({ track_pageview: false }, options.mixpanelConfig)
  )
}

exports.wrapRootElement = ({ element }) => (
  <MixpanelProvider>{element}</MixpanelProvider>
)
