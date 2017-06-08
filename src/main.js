// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import VueResource from 'vue-resource';
import store from './store';
import 'iview/dist/styles/iview.css'; 
import api from './api';
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};


Vue.use(iView);// iView
Vue.use(VueResource);// VueResource

Vue.http.options.emulateJSON = true;
// http拦截器 处理发送请求前的事情和发送请求后的事情
Vue.http.interceptors.push((request, next) => {
   console.info("发送请求......",request);
　　next((response) => {
        console.info("请求结束.....",request);
        if(response && response.data && response.data.status == "401" || response.data.status == "403" ){
            console.log(response,"401","403")
        }
        if(response && response.data && response.data.status != "200"){
          response.data.data = {

          };
        }
        return response;
        
  });
});


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  api,
  router,
  template: '<App/>',
  components: { App }
})

