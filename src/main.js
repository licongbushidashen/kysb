import App from "./App"
import store from "./store"
import uView from "uview-ui"
import {jsBridge} from './common/utils';
// import imageLoad from "vue-images-loaded";
window.ZjH5Bridge = {
  // 处理message
  callbackFromNative: function(callID, needFunCallback, result) {
    // console.log('callBackFromNative result', result)
    if (needFunCallback) {
      window[callID](result)
    } else {
      // console.log('result', result)
    }
  }
}
// #ifndef VUE3
import Vue from "vue"
Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = "rpx"
// 引入uView提供的对vuex的简写法文件
let vuexStore = require("@/store/$u.mixin.js")

function padLeftZero(str) {
  return ("00" + str).substr(str.length)
}
Vue.mixin(vuexStore)
Vue.filter("formatDate", function (oldDate, fmt = "yyyy-MM-dd hh:mm", placeholders = "暂无数据") {
  if (!oldDate || oldDate == 0) return placeholders
  // let issafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  // if (issafariBrowser && !isTimestamp) timestamp = new Date(timestamp.replace(/-/g, '/')).getTime()
  let date = new Date(oldDate)
  // 正则匹配/(y+)/ 字符串fmt--'yyyy-MM-dd hh:mm'，如果匹配到，就获取第一个匹配的文本，即yyyy,
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    // 将yyyy替换成年份，如1970
    // date.getFullYear()的类型是number,(date.getFullYear() + '') 加个空字符串将number转成字符串类型
    // substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ""
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
})
Vue.filter('ChangeHourMinutestr',function(str){
  if (str !== "0" && str !== "" && str !== null) {
    return ((Math.floor(str / 60)).toString().length < 2 ?  + (Math.floor(str / 60)).toString() : 
    (Math.floor(str / 60)).toString()) + "时" + ((str % 60).toString().length < 2 ?  + (str % 60).toString() : (str % 60).toString())+'分';
    }
    else
    {
    return "";
    }
})
// Vue.directive('imageLoad',imageLoad)
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = "app"
const app = new Vue({
  store,
  ...App
})
import httpInterceptor from "@/common/http.interceptor.js"
Vue.use(httpInterceptor, app)
import httpApi from "@/common/http.api.js"
let R = httpApi(1)
Vue.prototype.$res = R
if (process.env.NODE_ENV === "production") {
  console.log(1)
  Vue.prototype.https = "https://yqdj-test.zhejianglab.com"
  Vue.prototype.urlhttp = "https://hqauth.zhejianglab.com/api/logistics/files/www/"
  Vue.prototype.rzs = "https://hqauth.zhejianglab.com/.well-known/openid-configuration"
  Vue.prototype.rzss = "https://yqdj-auth-test.zhejianglab.com"
} else {
  console.log(2)
  // Vue.prototype.https = "https://zjlab-logistics.demo.wy5u.com"
  // Vue.prototype.urlhttp = "https://zjlab-logistics.demo.wy5u.com/api/logistics/files/www/"
  // Vue.prototype.rzs = "https://zjlab-logistics-auth.demo.wy5u.com/.well-known/openid-configuration"
  // Vue.prototype.rzss = "https://zjlab-logistics-auth.demo.wy5u.com/connect/token"
  // Vue.prototype.https = 'https://sb.demo.wy5u.com'
  Vue.prototype.https = '/sb'
  Vue.prototype.urlhttp =
    'https://sb-auth.demo.wy5u.com/api/logistics/files/www/'
  Vue.prototype.rzs =
    'https://sb-auth.demo.wy5u.com/.well-known/openid-configuration'
  // Vue.prototype.rzss = 'https://sb-auth.demo.wy5u.com'
  Vue.prototype.rzss='/sbauth'
}

function openphone(val){
  // 打电话
  // uni.showToast({
  //   title: '调用成功',
  //   icon: 'none',
  //   duration: 5000
  // })
jsBridge.invoke('dialPhoneCall', {
  phoneNum: val
}, (data) => {
 
})

// // 关闭当前页面
// jsBridge.invokeWithoutback('close', {})

}
function appclose(){
  jsBridge.invokeback('close', {})
}
function ChangeHourMinutestr(str) {
  if (str !== "0" && str !== "" && str !== null) {
  return ((Math.floor(str / 60)).toString().length < 2 ?  + (Math.floor(str / 60)).toString() : 
  (Math.floor(str / 60)).toString()) + "时" + ((str % 60).toString().length < 2 ?  + (str % 60).toString() : (str % 60).toString())+'分';
  }
  else
  {
  return "";
  }
  }
  Vue.prototype.ChangeHourMinutestr = ChangeHourMinutestr
Vue.prototype.openphone = openphone
Vue.prototype.appclose = appclose
function openUrlWin(url, _this) {
  if (url) {
    console.log(_this)
    let urls = url.split("?")
    if (urls.length > 1) {
      window.location.href = `${url}&accessToken=${_this.$store.state.query_token || localStorage.getItem("query_token")}`
    } else {
      window.location.href = `${url}?accessToken=${_this.$store.state.query_token || localStorage.getItem("query_token")}`
    }
  }
}
Vue.prototype.openUrlWin = openUrlWin
app.$mount()

// #endif

// #ifdef VUE3

import { createSSRApp } from "vue"
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.config.globalProperties.$adpid = "1111111111"
  app.config.globalProperties.$backgroundAudioData = {
    playing: false,
    playTime: 0,
    formatedPlayTime: "00:00:00"
  }
  return {
    app
  }
}
// #endif
