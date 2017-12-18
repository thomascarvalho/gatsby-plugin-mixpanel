[![npm package](https://img.shields.io/npm/v/gatsby-plugin-mixpanel.svg?style=flat-square)](https://www.npmjs.org/package/gatsby-plugin-mixpanel)

# gatsby-plugin-mixpanel

This plugin is to facilitate [mixpanel](https://www.mixpanel.com) (integration with [react-mixpanel](https://github.com/neciu/react-mixpanel)) on your [gatsby](https://github.com/gatsbyjs/gatsby) projet

## Install

`npm install --save gatsby-plugin-mixpanel` or `yarn add gatsby-plugin-mixpanel`


## How to use

Add the plugin in your gatsby-config.js and set your mixpanel api token

```javascript
plugins: [
  {
    resolve: 'gatsby-plugin-mixpanel',
    options: {
      apiToken: 'YOUR_MIXPANEL_API_TOKEN',
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
        )
    }
}

HelloWorld.contextTypes = { // mixpanel must be declared on contextTypes 
    mixpanel: PropTypes.object.isRequired
};
```

## Todo lists / Ideas

- [ ] add option to track routing changes ?
- [ ] add option to enable mixpanel only on production ?

Enjoy this little plugin and feel free to contribute :smiley:
