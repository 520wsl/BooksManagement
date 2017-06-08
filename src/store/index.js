import Vue from 'vue';
import Vuex from 'vuex';
import User from './User'; //用户模块
//文件导出内容
Vue.use(Vuex);

let Store = new Vuex.Store({
  modules: {
    User
  }
});
export default Store; 