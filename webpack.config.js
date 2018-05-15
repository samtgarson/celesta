const path = require('path')
const webpack = require('webpack')
const winston = require('winston-color')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackSynchronizableShellPlugin = require('webpack-synchronizable-shell-plugin')
const NativeScriptVueExternals = require('nativescript-vue-externals')
const NativeScriptVueTarget = require('nativescript-vue-target')

// Prepare NativeScript application from template (if necessary)
require('./prepare')()

// Generate platform-specific webpack configuration
const config = (platform, launchArgs, tnsAction) => {
  winston.info(`Bundling application for ${platform}...`)

  const plugins = [

    // Extract CSS to separate file
    new ExtractTextPlugin({ filename: `app.${platform}.css` }),

    // Copy src/assets/**/* to dist/
    new CopyWebpackPlugin([
      { from: 'assets', context: 'src' }
    ]),

    // Execute post-build scripts with specific arguments
    new WebpackSynchronizableShellPlugin({
      onBuildEnd: {
        scripts: [
          ...launchArgs ? [`node launch.js ${launchArgs}`] : []
        ],
        blocking: false
      }
    })

  ]

  if (tnsAction !== 'debug') {
    plugins.push(

      // Optimize CSS output
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: false
      }),

      // Minify JavaScript code
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false }
      }),

    )
  } else {
    plugins.push(
      new webpack.DefinePlugin({
        DEBUG: JSON.stringify(true)
      })
    )
  }

  // CSS / SCSS style extraction loaders
  const cssLoader = ExtractTextPlugin.extract({
    use: [
      {
        loader: 'css-loader',
        options: { url: false }
      }
    ]
  })
  const scssLoader = ExtractTextPlugin.extract({
    use: [
      {
        loader: 'css-loader',
        options: {
          url: false,
          includePaths: [path.resolve(__dirname, 'node_modules')]
        }
      },
      'sass-loader'
    ]
  })

  return {

    target: NativeScriptVueTarget,

    entry: path.resolve(__dirname, './src/main.js'),

    output: {
      path: path.resolve(__dirname, './dist/app'),
      filename: `app.${platform}.js`
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader'
        },

        {
          test: /\.css$/,
          use: cssLoader
        },
        {
          test: /\.scss$/,
          use: scssLoader
        },

        {
          test: /\.vue$/,
          loader: 'ns-vue-loader',
          options: {
            extractCSS: true
          }
        }
      ]
    },

    resolve: {
      modules: [
        'node_modules/tns-core-modules',
        'node_modules'
      ],
      extensions: [
        `.${platform}.css`,
        '.css',
        `.${platform}.scss`,
        '.scss',
        `.${platform}.js`,
        '.js',
        `.${platform}.vue`,
        '.vue'
      ],
      alias: {
        Components: path.resolve(__dirname, '../components/'),
        src: path.resolve(__dirname, 'src/')
      }
    },

    externals: NativeScriptVueExternals,

    plugins,

    stats: 'errors-only',

    node: {
      http: false,
      timers: false,
      setImmediate: false,
      fs: 'empty'
    }

  }
}

// Determine platform(s) and action from webpack env arguments
module.exports = env => {
  const action = (!env || !env.tnsAction) ? 'build' : env.tnsAction

  if (!env || (!env.android && !env.ios)) {
    return [config('android', action, env.tnsAction), config('ios', action, env.tnsAction)]
  }

  return env.android && config('android', `${action} android`, env.tnsAction)
    || env.ios && config('ios', `${action} ios`, env.tnsAction)
    || {}
}
