const path = require('path')
const root = __dirname
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack')


let extractPlugin = new ExtractTextPlugin({
    filename: 'bundle.css', // scss轉css後另存的目標檔名
    disable: false
})

module.exports = {
    // 入口文件
    entry: [
        'react-hot-loader/patch', // 激活HMR
        'webpack-dev-server/client',
        'webpack/hot/only-dev-server',
        path.resolve(root, 'src/index.js')
    ],
    // 出口文件
    output: {
        filename: 'bundle.js',
        path: path.resolve(root, 'dist'),
        publicPath: '/'
    },
    // loaders
    devServer: {
        hot: true, // 激活服務端的HMR
        contentBase: path.resolve(root, 'dist'),
        publicPath: '/',
        port: 8080,
        historyApiFallback: true
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.css$/, // 針對所有.css 的檔案作預處理，這邊是用 regular express 的格式
            use: [
                'style-loader', // 這個會後執行 (順序很重要)
                'css-loader' // 這個會先執行
            ]
        }, {
            test: /\.sass$/,
            use: [
                'style-loader',
                'css-loader',
                {
                	loader:'postcss-loader',
                	options:{
                		'plugins': [require('autoprefixer')({
                			'browsers': ['last 5 versions']
                		})]
                	}
                },
                'sass-loader'
            ]
        }, {
            test: /\.(jpe?g|png|gif|svg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 40000, //小於40kb，將檔案編成字串並插入 JavaScript，否則就以圖片檔案來輸出。
                        name: "images/[hash:8].[name].[ext]" //打包後的位置
                    }
                },
                'image-webpack-loader'
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 40000,
                    name: "font/[hash:8].[name].[ext]"
                }
            }
        }
        ]
    },
    plugins: [
    	new webpack.ProvidePlugin({
    		'Promise': 'es6-promise',
    		'fetch': 'isomorphic-fetch'
    	}),
        new HtmlWebpackPlugin({
            title: 'React Demo',
            template: path.resolve(root, 'src/index.html')
        }),
        extractPlugin,
        new webpack.HotModuleReplacementPlugin(), // 熱替換插件
        new webpack.NamedModulesPlugin() // 執行HMR時印出module名
    ],
    resolve: {
    	alias: {
    		utils: path.join(__dirname, 'src/js/utils'),
    		views: path.join(__dirname, 'src/js/views'),
    		constants: path.join(__dirname, 'src/js/constants'),
    		svg: path.join(__dirname, 'src/svg'),
    	}
    }
}

