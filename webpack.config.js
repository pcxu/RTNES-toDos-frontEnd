const path = require('path');

// 压缩JS的插件
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
// 分离css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 保存public的存储
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 清理上次dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 打包html
const HtmlWebpackPlugin = require( 'html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.tsx'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '',
        // libraryTarget: 'umd',
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader",
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader",
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },

            /*
            * 支持css
            * 通过使用不同的 style-loader 和 css-loader, 可以将 css 文件转换成JS文件类型。
            * */
           {
                test: /\.css/,
                // use: ['style-loader', 'css-loader'],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
            /*
            * 支持编译less和sass
            * */
            {
                test: /.less/,
                // use: ['style-loader', 'css-loader', 'less-loader'],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'less-loader'
                ],
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
            /*
            * 支持加载图片
            * file-loader: 解决CSS等文件中的引入图片路径问题
            * url-loader: 当图片小于limit的时候会把图片Base64编码，大于limit参数的时候还是使用file-loader进行拷贝
            * */
            {
                test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1,
                            outputPath: 'images'
                        }
                    }
                ]
            },
        ]
    },

    devServer: {
        host: 'localhost',
        port: 8001,
        open: false,
        hot: true,
        contentBase: path.resolve(__dirname, "public"),
        overlay: {
            errors: true,
            warnings: false,
        }
    },

    plugins: [
        new BundleAnalyzerPlugin(), // 打包分析
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'public'),
                to: path.resolve(__dirname, 'dist'),
            }
        ]), // 打包引入静态资源
        new CleanWebpackPlugin(), // 清理 dist
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        }), //压缩css
        new HtmlWebpackPlugin({
            filename: 'index.html',
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true// 压缩内联css
            },
            hash: true,
            template: path.resolve(__dirname, 'public/index.html'),
            inject: true,
          }),
    ],
    optimization: {
        minimizer: [
            new UglifyWebpackPlugin({
                parallel: 4
            })
        ]
    },

    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
};