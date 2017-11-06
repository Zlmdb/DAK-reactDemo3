//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
var webpack = require('webpack');
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var glob = require('glob');
var path = require('path');


// 取得相应的页面路径，因为之前的配置，所以是pages文件夹
var PAGE_PATH = path.resolve(__dirname, './app/pages')
    //多入口配置
    //通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
    //那么就作为入口处理
function entries() {
    var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
    var map = {}
    entryFiles.forEach((filePath) => {
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filePath
    })
    return map
}



//多页面输出配置
//与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
function htmlPlugin() {
    let entryHtml = glob.sync(PAGE_PATH + '/*/*.js') //这得到个数组
    let arr = []
    entryHtml.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let conf = {
                // 模板来源
                template: './index.html',
                // 文件名称
                filename: filename + '.html',
                // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
                chunks: [filename],
                inject: true
            }
            // if (process.env.NODE_ENV === 'production') {
            //     conf = merge(conf, {
            //         minify: {
            //             removeComments: true,
            //             collapseWhitespace: true,
            //             removeAttributeQuotes: true
            //         },
            //         chunksSortMode: 'dependency'
            //     })
            // }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
}

// var en=entries();
// var ht=htmlPlugin();
module.exports = { //注意这里是exports不是export
    //devtool: 'eval-source-map', //生成Source Maps,这里选择eval-source-map
    //devtool: 'cheap-module-eval-source-map',
    devtool: 'cheap-module-source-map',//生产环境用
    //entry: __dirname + "/app/pages/qa/qa.js", //唯一入口文件，就像Java中的main方法
    //entry: { qa: __dirname + "/app/pages/qa/qa.js", aq: __dirname + "/app/pages/aq/aq.js" }, //唯一入口文件，就像Java中的main方法
    entry: entries(), //唯一入口文件，就像Java中的main方法
    output: { //输出目录
        path: __dirname + "/build", //打包后的js文件存放的地方
        // publicPath: '/',
        filename: "js/[name]-[hash].js" //打包后的js文件名
    },
    module: {
        //loaders加载器
        loaders: [{
            test: /\.(js|jsx)$/, //一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
            exclude: /node_modules/, //屏蔽不需要处理的文件（文件夹）（可选）
            loader: 'babel-loader' //loader的名称（必须）
        }]
    },
    plugins: [
         new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production')
            }
        }),
        new UglifyJSPlugin({
           sourceMap: true
        })
        //热替换
        //new webpack.HotModuleReplacementPlugin(),
        // new OpenBrowserPlugin({
        //     url: 'http://' + hostName + ':' + devPort + '/' + index //测试页面选择qa.html，可以自己更改
        // })
    ].concat(htmlPlugin())
};