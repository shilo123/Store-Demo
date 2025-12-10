const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/products": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/Findproducts": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/ProductBuy": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/orders": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
