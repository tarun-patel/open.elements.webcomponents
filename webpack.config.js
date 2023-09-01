
const MiniCssExtractPlugin=require("mini-css-extract-plugin");

let mode="development";
let target="web";
if(process.env.NODE_ENV="production"){
    mode=process.env.NODE_ENV;
    // target="browserslist";
}

module.exports={
 mode:mode,
 target:target, //just to nullify the bug intoduced by using the .browserslistrc in the root folder. this may get fixed in upcoming verisons
 module:{
   
     rules:[
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },  {
         test:/\.(png|jpeg|gif|svg)$/i,
         type:"asset/resource",
        },
        {
            test: /\.styles.scss/,
            exclude: /node_modules/,
            use: [
              "sass-to-string",
              {
                loader: "sass-loader",
                options: {
                  sassOptions: {
                    outputStyle: "compressed",
                  },
                },
              },
            ],
          },
        {
            test:/\.(s[ac]|c)ss$/i,
            exclude: [/\.styles.scss$/, /node_modules/],
            use:[MiniCssExtractPlugin.loader,"css-loader","postcss-loader","sass-loader"]
          }
            ,{
            test:/\.[jt]s$/,
            include:[/src/],
            use:{
                loader:"babel-loader",
            }
         }

     ]
 },performance: {
  hints: false,
  maxEntrypointSize: 512000,
  maxAssetSize: 512000
},
 plugins:[ new MiniCssExtractPlugin()],
   resolve: {
    extensions: ['.js', '.ts'],
  },
 devtool:"source-map",// setup soruce map, use false(if we want it to be uncompressed)
 devServer:{
     static:"./dist",
     hot:true,
     historyApiFallback: {
      rewrites: [
        { from: /^\/home/, to: '/index.html' }
      ]
 }}

}
