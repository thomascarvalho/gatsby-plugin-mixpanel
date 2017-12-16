# gatsby-plugin-mixpanel

Add [mixpanel](https://www.mixpanel.com) on your gatsby website.
This plugin makes it easy to integrate [react-mixpanel](https://github.com/neciu/react-mixpanel) on your [gatsby](https://github.com/gatsbyjs/gatsby) website

## Install

`npm install --save gatsby-plugin-mixpanel`

or

`yarn add gatsby-plugin-mixpanel`

## How to use

Deplare the plugin in your gatsby-config.js and set mixpanel api token

```javascript
plugins: [
  {
    resolve: `gatsby-plugin-mixpanel`,
    options: {
      apiToken: "YOUR_MIXPANEL_API_TOKEN",
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

