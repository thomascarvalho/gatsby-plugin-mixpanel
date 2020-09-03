import React from 'react';
import {Mixpanel} from 'mixpanel-browser';

export const MixpanelProvider: ({children}: {children: any}) => React.ReactNode;
export const MixpanelConsumer: ({children}: {children: any}) => React.ReactNode;
export const withMixpanel: () => (
  WrappedComponent: any
) => React.ForwardRefExoticComponent<React.RefAttributes<any>>;
export const useMixpanel: () => Mixpanel;
