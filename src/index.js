import React, {
  PureComponent,
  createContext,
  cloneElement,
  useContext,
} from 'react'
import mixpanel from 'mixpanel-browser'

const MixpanelContext = createContext()

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
  return class extends PureComponent {
    render() {
      return (
        <MixpanelConsumer>
          <WrappedComponent {...this.props} />
        </MixpanelConsumer>
      )
    }
  }
}

export const useMixpanel = () => useContext(MixpanelContext)

export { mixpanel }
