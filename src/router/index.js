import Vue from 'vue'
import Router from  'vue-router'

// 登录，注册，首页
import Index from '@/views/news/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'

import Header from '@/views/Header/Header'
import YulinWarn from '@/views/system/YuLinWarn'

// 标准区
import StardArea from "@/views/header/StardArea"
import yulinS from '@/views/todayInfo/YuLinS'

// 年
import History from '@/views/historyInfo/year/History'
import yulinYear from "@/views/historyInfo/year/YuLinYear"

// 月
import HistoryMonth from '@/views/historyInfo/month/HistoryMonth'
import YulinMouth from '@/views/historyInfo/month/YuLinMonth'

// 日
import HistoryDay from '@/views/historyInfo/day/HistoryDay'
import YulinDay from '@/views/historyInfo/day/YuLinDay'

import HeaderStard from '@/views/header/HeaderStard'
import Yulin from '@/views/todayInfo/Yulin'

//管理员设置模块 
import HeaderSet from '@/views/Header/HeaderSet'
import HeaderSetI from '@/views/Header/HeaderSetI'
import YulinSet from '@/views/Resource/YuLinSet'
import Intelligent from '@/views/Resource/Intelligent'
// 404 
import NotFound from '@/components/404'
import Join from '@/views/About/join'


Vue.use(Router)

const router = new Router({
  mode:'history',  // 去掉路由地址的 # 
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/index/header/yulin',
      children: [{
          path: '/index/header',
          name: 'header',
          component: Header,
          children: [
            {
              path: '/index/header/yulin',
              name: 'yulin',
              component: Yulin
            }
          ]
        },
        {
          path: '/index/stardArea',
          name: 'stardArea',
          component: StardArea,
          children: [
          {
            path: '/index/stardArea/yulin',
            name: 'yulinS',
            component: yulinS
          }
        ]
        },
        {
          path: '/index/headerSet',
          name: 'headerSet',
          component: HeaderSet,
          children: [
            {
              path: '/index/headerSet/yulinSet',
              mame: 'yulinSet',
              component: YulinSet
            },
          ]
        },
        {
          path: '/index/headerSetI',
          name: 'headerSetI',
          component: HeaderSetI,
          children:[
            {
              path: '/index/headerSetI/intelligent',
              name: 'intelligent',
              component: Intelligent
            }
          ]
        },
        {
          path: '/index/headerStard',
          name: 'stard',
          component: HeaderStard,
          children: [
            {
              path: '/index/headerStard/yulinWarn',
              name: 'yulinWarn',
              component: YulinWarn
            }
          ]
        },
        {
          path: '/index/history',
          name: 'history',
          component: History,
          children:[
            {
              path: '/index/history/yulinYear',
              name: 'yulinYear',
              component: yulinYear
            }
          ]
        },
        {
          path: '/index/historyMonth',
          name: 'historyMonth',
          component: HistoryMonth,
          children:[
            {
              path: '/index/historyMonth/yulinMonth',
              name: 'yulinMouth',
              component: YulinMouth
            }
          ]
        },
        {
          path: '/index/historyDay',
          name: 'historyDay',
          component: HistoryDay,
          children: [
            {
              path: '/index/historyDay/yulinDay',
              name: 'yulinDay',
              component: YulinDay
            }
          ]
        },
        {
          path: '/index/join',
          name: 'join',
          component: Join
        }
      ]
    },

  ]

})

// 路由守卫
router.beforeEach((to,from,next)=>{
  let isLogin =localStorage.getItem("identity");
  if(to.path=="/login"||to.path=="/register"){
    next();
  }else {
    isLogin ? next(): next('/login');
  }
})



export default router;
