import Vue from 'vue';
import Vuex from 'vuex';
import { getGoods } from '@/api/';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        goods: [],
        shopcart: []
    },
    getters: {
        // 获取购物车总数量
        totalCount(state) {
            return state.shopcart.reduce((count, item) => {
                return count + item.count;
            }, 0);
        },
        // 获取购物车总价格
        totalPrice(state) {
            return state.shopcart.reduce((total, item) => {
                return total + item.price * item.count;
            }, 0);
        }
    },
    actions: {
        // 初始化goods
        async initProduct({ commit }) {
            // 定义id
            let id = 0;

            // 获取所有商品
            let goods = await getGoods();

            goods.forEach(item => {
                let foods = item.foods;
                foods.forEach(food => {
                    // 为food添加id
                    food.id = id++;
                    // 为购物车 初始化数量
                    food.count = 0;
                });
            });

            // 保存
            commit('setGoods', goods);

            return goods;
        },

        // 加入购物车
        addCart({ commit, state }, food) {
            // 查找购物车中是否存在该商品
            let cartFood = state.shopcart.find(item => item.id === food.id);

            // 异步操作购物车
            // ...
            // ...
            // ...

            // 更新本地状态
            if (cartFood) {
                commit('increaseFoodCount', cartFood);
            } else {
                commit('pushToCart', food);
            }
        },

        // 减少购物车数量
        minunsCart({ commit, state }, food) {
            let foodCart = state.shopcart.find(item => item.id === food.id);

            // 异步操作购物车
            // ...
            // ...
            // ...

            // 更新本地状态
            if (foodCart) {
                commit('minunsFoodCount', foodCart)
            }
        },

        // 清空购物车
        emptyCart({ commit }) {

            // 异步操作购物车
            // ...
            // ...
            // ...

            // 更新本地状态
            commit('empty');
        }
    },
    mutations: {
        setGoods(state, data) {
            state.goods = data;
        },
        // 初次加入购物车
        pushToCart(state, food) {
            food.count = 1;
            state.shopcart.push(food);
        },
        // 购物车已存在该商品，数量+1
        increaseFoodCount(state, { id }) {
            const cartFood = state.shopcart.find(item => item.id === id);
            cartFood.count ++;
        },
        minunsFoodCount(state, { id }) {
            let foodCart = state.shopcart.find(item => item.id === id);

            if (foodCart) {
                if (foodCart.count == 0) {
                    foodCart.count = 0;
                } else {
                    foodCart.count--;
                }
            }
        },
        // 清空购物车
        empty(state) {
            state.shopcart = [];
        }
    }
})

export default store
