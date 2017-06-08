import Vue from 'vue'
import Router from 'vue-router'

const Home =  r => require.ensure([], () => r(require('@/page/index')), 'home');
// 需求管理页面
const Demand =  r => require.ensure([], () => r(require('@/page/mangent/demand')), 'demand');
// 雇佣管理页面
const Employment =  r => require.ensure([], () => r(require('@/page/mangent/employment')), 'employment');
// 人员管理
const Personnel =  r => require.ensure([], () => r(require('@/page/mangent/personnel')), 'personnel');
// 系统管理
const System =  r => require.ensure([], () => r(require('@/page/mangent/system')), 'system');
// 财务管理
const Financial = r => require.ensure([], () => r(require('@/page/mangent/financial')),'financial');

Vue.use(Router)


const router = new Router({
  routes: [{
        path:"/",
        redirect:"user/demand"
    },
    {
      path: '/user',
      name: 'home',
      component: Home,
      children:[{
          path:'demand',
          name:'demand',
          component:Demand
      },{
          path:'employment',
          name:'employment',
          component:Employment
      },{
          path:'personnel',
          name:'personnel',
          component:Personnel
      },{
          path:'system',
          name:'system',
          component:System
      },
      {
          path:'financial',
          name:'financial',
          component:Financial
      }]
    }
  ]
});



export default router;