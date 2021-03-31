const path = require('path')

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        // react: path.resolve('./node_modules/react'),
      }
    }
  })
}
