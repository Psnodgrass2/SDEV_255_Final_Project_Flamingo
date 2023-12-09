const { defineConfig } = require('@vue/cli-service');
const fs = require('fs');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    https: {
      key: fs.readFileSync('./certs/localhost+1-key.pem'),
      cert: fs.readFileSync('./certs/localhost+1.pem'),
      allowedHosts: 'all'
    }
  },
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
