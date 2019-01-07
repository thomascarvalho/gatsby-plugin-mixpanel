import React from 'react';
import mixpanel from 'mixpanel-browser';
import MixpanelProvider from 'react-mixpanel';

const isEnable = options =>
  (process.env.NODE_ENV === `production` || options.enableOnDevMode) &&
  options.apiToken;

const getOptions = options =>
  Object.assign(
    {},
    {
      apiToken: null,
      enableOnDevMode: true,
      debug: false,
    },
    options
  );

const trackEvent = (eventName, properties) => {
  if (eventName) mixpanel.track(eventName, properties);
}

const trackPageViews = (location, pageViews) => {
  if (pageViews && location) {
    let eventName;
    if (pageViews instanceof Object) {
      eventName = pageViews[location.pathname];
    } else if (pageViews === 'all') {
      eventName = `View page ${location.pathname}`;
    }
    trackEvent(eventName, location);
  }
}

exports.onRouteUpdate = ({ location }, pluginOptions) => {
  const options = getOptions(pluginOptions);

  if (!isEnable(options)) {
    return;
  }

  trackPageViews(location, options.pageViews);
};

exports.onClientEntry = (skip, pluginOptions) => {
  const options = getOptions(pluginOptions);

  if (!isEnable(options)) {
    mixpanel.init('disable', { autotrack: false });
    mixpanel.disable();
    return;
  }

  mixpanel.init(options.apiToken, { debug: options.debug });
}

exports.wrapPageElement = ({ element }) => {
  return (
    <MixpanelProvider mixpanel={mixpanel}>
      { element }
    </MixpanelProvider>
  );
};
