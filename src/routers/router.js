import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const router = new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/goods'
        },
        {
            path: '/goods',
            name: 'goods',
            component: () => import(/* webpackChunkName: 'goods' */'@/views/Goods/Goods.vue')
        },
        {
            path: '/ratings',
            name: 'ratings',
            component: () => import(/* webpackChunkName: 'ratings */'@/views/Ratings/Ratings.vue')
        },
        {
            path: '/seller',
            name: 'seller',
            component: () => import(/* webpackChunkName: 'seller' */'@/views/Seller/Seller.vue')
        }
    ]
})

export default router
