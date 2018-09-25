[![npm package](https://img.shields.io/npm/v/gatsby-plugin-mixpanel.svg?style=flat-square)](https://www.npmjs.org/package/gatsby-plugin-mixpanel)

# gatsby-plugin-mixpanel

For Gatsby v2

Integrate [mixpanel](https://www.mixpanel.com) (with [react-mixpanel](https://github.com/neciu/react-mixpanel)) on your [gatsby](https://github.com/gatsbyjs/gatsby) project

## Install

`npm install --save gatsby-plugin-mixpanel` or `yarn add gatsby-plugin-mixpanel`

## How to use

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

You can access to mixpanel in the context of your components :

```javascript
class HelloWorld extends React.Component {
    componentDidMount() {
        this.context.mixpanel.track('Hello'); // send event 'Hello' to mixpanel
    }

    render() {
        return (
            <h1>Hello !</h1>
        );
    }
}

HelloWorld.contextTypes = { // mixpanel must be declared on contextTypes 
    mixpanel: PropTypes.object.isRequired
};
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

On the object pageViews you can declare url path and events that will be send on mixpanel.

example: 
```javascript
plugins: [
  {
    resolve: 'gatsby-plugin-mixpanel',
    options: {
      apiToken: 'YOUR_MIXPANEL_API_TOKEN',
      pageViews: {
        '/blog': 'Page blog view', // an event 'Page blog view' will be send to mixpanel a every vist on the /blog page
        '/404': 'Page 404 view',
      }
    },
  },
];
```


Enjoy this little plugin and feel free to contribute :smiley:
