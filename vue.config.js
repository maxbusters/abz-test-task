const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/abz-test-task/" : "/",
  chainWebpack: (config) => {
    config.module.rules.delete("svg");
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: "vue-svg-loader",
        },
      ],
    },
  },
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "@/assets/css/_reset.scss";
        @import "@/assets/css/_variables.scss";
        @import "@/assets/css/_mixin.scss";
       `,
      },
    },
  },
});
