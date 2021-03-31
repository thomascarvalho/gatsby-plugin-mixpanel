[![npm package](https://img.shields.io/npm/v/gatsby-plugin-mixpanel.svg?style=flat-square)](https://www.npmjs.org/package/gatsby-plugin-mixpanel)
[![Build Status](https://travis-ci.org/thomascarvalho/gatsby-plugin-mixpanel.svg?branch=master)](https://travis-ci.org/thomascarvalho/gatsby-plugin-mixpanel)
[![codecov](https://codecov.io/gh/thomascarvalho/gatsby-plugin-mixpanel/branch/master/graph/badge.svg)](https://codecov.io/gh/thomascarvalho/gatsby-plugin-mixpanel)

# gatsby-plugin-mixpanel

For Gatsby v3

Integrate [mixpanel](https://www.mixpanel.com) on your [gatsby](https://github.com/gatsbyjs/gatsby) project

## Install

`npm install --save gatsby-plugin-mixpanel` or `yarn add gatsby-plugin-mixpanel`

## How to use

### Declare plugin

Add the plugin in your gatsby-config.js and set your mixpanel api token

```javascript
plugins: [
  {
    resolve: 'gatsby-plugin-mixpanel',
    options: {
      apiToken: 'YOUR_MIXPANEL_API_TOKEN', // required
    },
  },
];
```

### Using mixpanel by passing props

You can access to mixpanel library in the props of your component by using the function ```withMixpanel``` available in the plugin

```javascript
import { withMixpanel } from 'gatsby-plugin-mixpanel'

class HelloWorld extends Component {
    componentDidMount() {
        const { mixpanel } = this.props
        mixpanel.track('Hello'); // send event 'Hello' to mixpanel
    }
    render() {/*...*/}
}

export default withMixpanel()(HelloWorld)

// or with decorators if your project supports
@withMixpanel()
class HelloWorld extends Component {
    /*...*/
}
```

### Using mixpanel with react hooks

**Your project must have a version of react that supports react-hooks.**

Import the ```useMixpanel``` hook.

```javascript
import { useMixpanel } from 'gatsby-plugin-mixpanel'

function HelloWorld() {
  const mixpanel = useMixpanel()
  mixpanel.track('Hello');
  return (
    <div>
      <button onClick={() => mixpanel.track('Hello button') }>Hello</button>
    </div>
  )
}

```

### Configuration

The plugin is configurable, here are the configs by default.

```javascript
plugins: [
  {
    resolve: 'gatsby-plugin-mixpanel',
    options: {
      apiToken: 'YOUR_MIXPANEL_API_TOKEN', // required
      // optional fields, default values
      enableOnDevMode: true, // if false mixpanel will be activated on NODE_ENV=production only
      mixpanelConfig: null, // override specific config for mixpanel initialization https://github.com/mixpanel/mixpanel-js/blob/8b2e1f7b/src/mixpanel-core.js#L87-L110
      pageViews: null, // see below
       // set pageViews to 'all' and use this option to set the same event name for all page view events
      trackPageViewsAs: null, // optionally: set an Event Name to use for all page views, eg: trackPageViewsAs: 'Page view'
      getPageViewTransformerFn: null, // optionally: function body as a string to customize the event sent to mixpanel. Receives one parameter: location. Example 'return () => ({url: location.pathname})'
    },
  },
];
```

The pageViews param is null by default, if you want to autotrack some page you can declare an object url path and events that will be send on mixpanel.
Or if you want to track every route changes set pageViews to 'all'.

example: 
```javascript
plugins: [
  {
    resolve: 'gatsby-plugin-mixpanel',
    options: {
      apiToken: 'YOUR_MIXPANEL_API_TOKEN',
      pageViews: {
        '/blog': 'Page blog view', // an event 'Page blog view' will be send to mixpanel on every visit on the /blog page
        '/404': 'Page 404 view',
      },
      mixpanelConfig: null, // you can override default config for mixpanel library https://github.com/mixpanel/mixpanel-js/blob/8b2e1f7b/src/mixpanel-core.js#L87-L110
      /*
      pageViews: 'all' // to track every route changes
      */
    },
  },
];
```


Enjoy this little plugin and feel free to contribute :smiley:
