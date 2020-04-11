import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: () => import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
      meta: {
        title: '自述文件'
      },
      children: [{
          path: '/dashboard',
          component: () => import( /* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
          meta: {
            title: '系统首页'
          }
        },
        {
          path: '/student',
          component: () => import( /* webpackChunkName: "table" */ '../components/page/StudentTable.vue'),
          meta: {
            title: '学生基本信息管理'
          }
        },
        {
          path: '/table',
          component: () => import( /* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
          meta: {
            title: '班级信息管理'
          }
        },
        {
          path: '/class',
          component: () => import( /* webpackChunkName: "class" */ '../components/page/ClassTable.vue'),
          meta: {
            title: '课程和成绩管理'
          }
        },
        {
          path: '/schoolRoll',
          component: () => import( /* webpackChunkName: "class" */ '../components/page/SchoolRoll.vue'),
          meta: {
            title: '学籍管理'
          }
        },
        {
          path: '/tabs',
          component: () => import( /* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
          meta: {
            title: '信息管理'
          }
        },
        {
          // 权限页面
          path: '/permission',
          component: () => import( /* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
          meta: {
            title: '权限测试',
            permission: true
          }
        },
        {
          path: '/404',
          component: () => import( /* webpackChunkName: "404" */ '../components/page/404.vue'),
          meta: {
            title: '404'
          }
        },
        {
          path: '/403',
          component: () => import( /* webpackChunkName: "403" */ '../components/page/403.vue'),
          meta: {
            title: '403'
          }
        },
      ]
    },
    {
      path: '/login',
      component: () => import( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      component: () => import( /* webpackChunkName: "login" */ '../components/page/Register.vue'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});