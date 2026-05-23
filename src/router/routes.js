// import DefaultLayout from '../layout/default.vue'
import Dashboard from '../pages/Dashboard/index.vue'
import Referral from '../pages/Referral/index.vue'
import Billing from '../pages/Billing/index.vue'
import Position from '../pages/Position/index.vue'
import Orders from '../pages/Orders/index.vue'
import Calender from '../pages/CalenderAnalytics/index.vue'
import Profile from '../pages/Profile/index.vue'
export default [
  {
    path: '/',
    component: () => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('authCode') && params.get('userId') && params.get('appcode')) {
            return import('../components/common/CallbackPage.vue');
        }
        if (params.get('tokenId')) {
            return import('../components/common/CallbackPage.vue');
        }
        return import('../layout/default.vue');
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'referral',
        name: 'Referral',
        component:Referral 
      },
      {
        path: 'billing',
        name: 'Billing',
        component: Billing,
        // meta: { hideSidebar: true },
      },
      {
        path: 'position',
        name: 'Position',
        component: Position,
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
      },
      {
        path: 'calender-analytics',
        name: 'Calender',
        component: Calender,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
      }
    //   {
    //     path: 'users',
    //     name: 'users',
    //     component: () => import('../pages/Users/Users.vue'),
    //   },
    //   {
    //     path: 'profile',
    //     name: 'profile',
    //     component: () => import('../pages/Profile/index.vue'),
    //   },
    //   {
    //     path: 'calender/:id',
    //     name: 'calender',
    //     component: () => import('../pages/Calender/Main.vue'),
    //   },
    //   {
    //     path: 'reports',
    //     name: 'reports',
    //     component: () => import('../pages/Reports/index.vue'),
    //   },
    //   {
    //     path: 'orders',
    //     name: 'orders',
    //     component: () => import('../pages/Orders/index.vue'),
    //   },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../pages/Auth/Login.vue')
  },
  {
    name: 'forgot-password',
    path: '/forgot-password',
    component: () => import('../pages/Auth/ForgetPassword.vue')
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('../pages/Auth/Register.vue')
  },
]
