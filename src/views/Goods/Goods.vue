<template>
    <div class="goods">
        <!-- 左侧列表 -->
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" :key="index" class="menu-item">
                    <span class="text border-1px">
                        <supports-ico class="icon" v-show="item.type>0" :size="3" :type="item.type" />{{ item.name }}
                    </span>
                </li>
            </ul>
        </div>
        <!-- 右侧内容 -->
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook" ref="foodList">
                    <!-- 分类名称 -->
                    <h1 class="title">{{ item.name }}</h1>
                    <!-- 分类内容 -->
                    <ul>
                        <li v-for="(food, findex) in item.foods" :key="findex" class="food-item">
                            <!-- 商品图标 -->
                            <div class="icon">
                                <img :src="food.icon" width="57" height="57" />
                            </div>
                            <!-- 商品信息 -->
                            <div class="content">
                                <h2 class="name">{{ food.name }}</h2>
                                <p class="desc">{{ food.description }}</p>
                                <div class="extra">
                                    <span class="count">月售{{ food.sellCount }}份</span>
                                    <span>好评率{{ food.rating }}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{ food.price }}</span>
                                    <span v-show="food.oldPrice" class="old">￥{{ food.oldPrice }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api/index.js'
import SupportsIco from '@/components/Supports-ico/Supports-ico.vue';

// BetterScroll
import BScroll from 'better-scroll';

export default {
    props: {
        seller: {
            type: Object
        },
    },
    data() {
        return {
            goods: [], // 商品数据
            listHeight: [], // 每个区间的高度
            scrollY: 0, // 保存区域滚动的Y轴位置
        }
    },
    async created () {
        this.goods = await getGoods();
    },
    mounted () {
        this.$nextTick(() => {
            // 初始化Bscroll
            this._initScroll();
            // 计算区间高度
            this._calculateHeight();
        });
    },
    computed: {
        // 左侧菜单的当前（高亮的）索引
        currentIndex() {
            for(let i = 0; i < this.listHeight.length; i++) {
                // 区间上高度
                let height1 = this.listHeight[i];
                // 区间下高度
                let height2 = this.listHeight[i + 1];
                
                // 当前是在最后一个区间，或处于这个区间之间
                if (!height2 || (this.scrollY > height1 && this.scrollY < height2)) {
                    return i;
                }
            }
        }
    },
    methods: {
        // 初始化 BScroll
        _initScroll() {
            // 初始化menu的滚动
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {});
            // 初始化food的滚动
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                probeType: 3
            });

            // 监听滚动，获取y值
            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            })
        },
        // 计算区间高度
        _calculateHeight() {
            // 获取区间元素（该区间包括了区间标题以及该区间下所有的食品：热销榜、单人精彩套餐...）
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');

            let height = 0;
            this.listHeight.push(height);
            for(let i = 0; i < foodList.length; i++) {
                // 获取每个foodList
                let item = foodList[i];
                // 获取高度并累加
                height += item.clientHeihgt;
                this.listHeight.push(height);
            }
        }
    },
    components: {
        SupportsIco,
    },
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin";

.goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
        flex 0 0 80px
        width 80px
        background-color #f3f5f7
        .menu-item
            display table
            height 54px
            width 56px
            line-height 14px
            padding 0 12px
            .text
                display table-cell
                width 56px
                vertical-align middle
                font-size 12px
                border-1px(rgba(7, 17, 27, .1))
    .foods-wrapper
        flex 1
        .title
            padding-left 14px
            height 26px
            line-height 26px
            border-left 2px solid #d9dde1
            font-size 12px
            color rgb(147, 153, 159)
            background-color #f3f5f7
        .food-item
            display flex
            margin 18px
            padding-bottom 18px
            border-1px(rgba(7, 17, 27, .1))
            &:last-child
                border-none()
                margin-bottom 0
            .icon
                flex 0 0 57px
                margin-right 10px
            .content
                flex 1
                .name
                    margin 2px 0 8px 0
                    height 14px
                    line-height 14px
                    font-size 14px
                    color rgb(7, 17, 27)
                .desc, .extra
                    line-height 10px
                    color rgb(147, 153, 159)
                    font-size 10px
                .desc
                    line-height 12px
                    margin-bottom 8px
                .extra
                    line-height 10px
                    .count
                        margin-right 12px
                .price
                    font-weight 700
                    line-height 24px
                    .now
                        margin-right 8px
                        font-size 14px
                        color rgb(240, 20, 20)
                    .old
                        font-size 10px
                        color rgb(147, 153, 159)
                        text-decoration-line line-through
</style>