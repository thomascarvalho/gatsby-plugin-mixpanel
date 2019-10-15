import React from 'react'

const api_host = process.env.MIXPANEL_API_BASE || 'https://api.mixpanel.com';

import { MixpanelProvider, mixpanel } from '.'

function isEnable(options) {
  return (process.env.NODE_ENV === `production` || options.enableOnDevMode) &&
  options.apiToken
}

function trackEvent(eventName, properties) {
  if (eventName) mixpanel.track(eventName, properties)
}

function trackPageViews(
  location,
  pageViews,
  trackPageViewsAs,
  getPageViewTransformerFn,
) {
  if (pageViews && location) {
    let eventName;
    if (pageViews instanceof Object) {
      eventName = pageViews[location.pathname];
    } else if (trackPageViewsAs) {
      eventName = trackPageViewsAs;
    } else if (pageViews === 'all') {
      eventName = `View page ${location.pathname}`;
    }

    const pageViewEventTransformerFn = new Function(
      'location',
      getPageViewTransformerFn,
    );
    const event = pageViewEventTransformerFn()(location);
    trackEvent(eventName, event);
  }
}

function getOptions(pluginOptions) {
  const defaultsOptions = {
    apiToken: null,
    enableOnDevMode: true,
    mixpanelConfig: null,
    trackPageViewsAs: null,
    getPageViewTransformerFn: 'return function(location) { return location; }',
  };

  const options = { ...defaultsOptions, ...pluginOptions };
  return { ...options, isEnable: isEnable(options) };
}

exports.onRouteUpdate = ({ location }, pluginOptions) => {
  const options = getOptions(pluginOptions)

  if (!isEnable(options)) {
    return
  }

  trackPageViews(
    location,
    options.pageViews,
    options.trackPageViewsAs,
    options.getPageViewTransformerFn,
  );
};

exports.onClientEntry = (skip, pluginOptions) => {
  const options = getOptions(pluginOptions)

  if (!options.isEnable) {
    mixpanel.init('disable', { autotrack: false, api_host })
    mixpanel.disable()
    return
  }

  const customOptions = Object.assign({ track_pageview: false, api_host }, options.mixpanelConfig);

  mixpanel.init(
    options.apiToken,
    customOptions
  )
}

exports.wrapRootElement = ({ element }) => (
  <MixpanelProvider>{element}</MixpanelProvider>
)
