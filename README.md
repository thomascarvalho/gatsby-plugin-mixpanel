[![npm package](https://img.shields.io/npm/v/gatsby-plugin-mixpanel.svg?style=flat-square)](https://www.npmjs.org/package/gatsby-plugin-mixpanel)

# gatsby-plugin-mixpanel

For Gatsby v2

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

// or with decorators
@withMixpanel()
class HelloWorld extends Component {
    /*...*/
}
```

### Using mixpanel with react-hooks

**Your project must have a version of react that supports react-hooks.**

Import the ```useMixpanel``` hook.

```javascript
import { useMixpanel } from 'gatsby-plugin-mixpanel'

const HelloWorld = () => {
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
      debug: false, // if true activate debug mode on mixpanel library
      enableOnDevMode: true, // if false mixpanel will be activated on NODE_ENV=production only
      pageViews: null // see below
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
      }
      /*
      pageViews: 'all' // to track every route changes
      */
    },
  },
];
```


Enjoy this little plugin and feel free to contribute :smiley:
