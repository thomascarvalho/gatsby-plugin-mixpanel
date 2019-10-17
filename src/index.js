import React, {
  PureComponent,
  createContext,
  cloneElement,
  useContext,
} from 'react'

import mixpanel from 'mixpanel-browser'

const MixpanelContext = createContext(mixpanel)

export const MixpanelProvider = ({ children }) => (
  <MixpanelContext.Provider value={mixpanel}>
    {children}
  </MixpanelContext.Provider>
)

export const MixpanelConsumer = ({ children }) => (
  <MixpanelContext.Consumer>
    {mixpanel => cloneElement(children, { mixpanel })}
  </MixpanelContext.Consumer>
)

export const withMixpanel = () => WrappedComponent => {
  class WithMixpanel extends PureComponent {
    render() {
      return (
        <MixpanelConsumer>
          <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
        </MixpanelConsumer>
      )
    }
  }

  return React.forwardRef((props, ref) => {
    return <WithMixpanel {...props} forwardedRef={ref} />
  })
}

export const useMixpanel = () => useContext(MixpanelContext)

export { mixpanel }
