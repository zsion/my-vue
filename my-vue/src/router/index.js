import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import List from '@/components/List'
import Library from '@/components/Library'
import Sale from '@/components/Sale'
import Appear from '@/components/Appear'
import Zgsb from '@/components/Zgsb'

import searchZgsb from '@/components/searchZgsb'
import searchAppear from '@/components/searchAppear'
import searchYzxpj from '@/components/searchYzxpj'

import Yzxpj from '@/components/Yzxpj'
import ZgsbDetail from '@/components/ZgsbDetail'
import YzxpjDetail from '@/components/YzxpjDetail'
import Detail from '@/components/Detail'
import Null from '@/components/Null'
import Chart from '@/components/Chart'
import Ksfb from '@/components/Ksfb'
import Clxx from '@/components/Clxx'
import Dingyue from '@/components/Dingyue'
import DingyueList from '@/components/DingyueList'
import DingyueTs from '@/components/DingyueTs'

Vue.use(Router)

function getAbsolutePath () {
  let path = location.pathname
  return path.substring(0, path.lastIndexOf('/') + 1)
}

export default new Router({
  mode: 'history',
  base: getAbsolutePath(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/About',
      name: 'About',
      component: About,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/List',
      name: 'List',
      component: List,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/Library',
      name: 'Library',
      component: Library,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/Sale',
      name: 'Sale',
      component: Sale,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/Appear',
      name: 'Appear',
      component: Appear,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/Zgsb',
      name: 'Zgsb',
      component: Zgsb,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/Yzxpj',
      name: 'Yzxpj',
      component: Yzxpj,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/searchZgsb',
      name: 'searchZgsb',
      component: searchZgsb,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/searchAppear',
      name: 'searchAppear',
      component: searchAppear,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/searchYzxpj',
      name: 'searchYzxpj',
      component: searchYzxpj,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/Ksfb',
      name: 'Ksfb',
      component: Ksfb,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/Clxx',
      name: 'Clxx',
      component: Clxx,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/Dingyue',
      name: 'Dingyue',
      component: Dingyue,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/DingyueList',
      name: 'DingyueList',
      component: DingyueList,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/DingyueTs',
      name: 'DingyueTs',
      component: DingyueTs,
      meta: {
        keepAlive: true,
        isBack:false, //用于判断上一个页面是哪个
      }
    },
    {
      path: '/ZgsbDetail',
      name: 'ZgsbDetail',
      component: ZgsbDetail,
    },
    {
      path: '/YzxpjDetail',
      name: 'YzxpjDetail',
      component: YzxpjDetail,
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail,
    },
    {
      path: '/Chart',
      name: 'Chart',
      component: Chart,
    },
    {
      path: '*',
      name: 'Null',
      component: Null
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

