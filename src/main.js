// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jsEncrypt from 'jsencrypt'
import CryptoJS from 'crypto-js'

// 设置反向代理，前端请求默认发送到http://localhost:8888/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8888/api'
// 全局注册，让其它组件可以通过this.$axios发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.prototype.$jsEncrypt = jsEncrypt

Vue.prototype.myrsa = function (value) {
  let jse = new this.$jsEncrypt()
  jse.setPublicKey('-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8ygMKjJLSUpnfXqt8lRSAdDxAHWKi9GbTFkCbAjkRCR6VUakxxXLXHQUtPCizKcvNpuYqZ5bO8LEgpY7SL3JEdEI9OuMnZ6ToeHPfcHeS+EgN0oYmdQ49RB5wZkcBEFk80OBEAM6VhnE0IuHGkU5ko9oPHq3boEQ3Ej6r3T+UhQIDAQAB-----END PUBLIC KEY-----')
  let encrypted = jse.encrypt(value)
  console.log(encrypted)
  return encrypted
}

Vue.prototype.myaes = function (value) {
  let key = CryptoJS.enc.Utf8.parse('abcdefgabcdefg12')
  let srcs = CryptoJS.enc.Utf8.parse(value)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
