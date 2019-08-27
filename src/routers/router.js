import Vue from 'vue';
import Router from 'vue-router';
import Goods from '@/views/Goods/Goods.vue';
import Ratings from '@/views/Ratings/Ratings.vue';
import Seller from '@/views/Seller/Seller.vue';

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
            component: Goods
        },
        {
            path: '/ratings',
            name: 'ratings',
            component: Ratings
        },
        {
            path: '/seller',
            name: 'seller',
            component: Seller
        }
    ]
})

export default router
