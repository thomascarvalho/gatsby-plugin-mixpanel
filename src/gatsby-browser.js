import React from 'react'
import mixpanel from 'mixpanel-browser'
import MixpanelProvider from 'react-mixpanel'

exports.wrapRootComponent = ({ Root }, pluginOptions) => () => {
  mixpanel.init(pluginOptions.apiToken)
  return (
    <MixpanelProvider mixpanel={mixpanel}>
      <Root />
    </MixpanelProvider>
  )
}
