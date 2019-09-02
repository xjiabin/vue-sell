<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span class="block positive" :class="{'active': selectType === 2}" @click.stop="select(2)">
                {{ desc.all }}<span class="count">{{ ratings.length }}</span>
            </span>
            <span class="block positive" :class="{'active': selectType === 0}" @click.stop="select(0)">
                {{ desc.positive }}<span class="count">{{ positive.length }}</span>
            </span>
            <span class="block negative" :class="{'active': selectType === 1}" @click.stop="select(1)">
                {{ desc.negative }}<span class="count">{{ negative.length }}</span>
            </span>
        </div>
        <div class="switch" :class="{'on': onlyContent}" @click.stop="toggleContent">
            <i class="icon icon-check_circle"></i>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
    const POSITIVE = 0; // 正向
    const NEGATIVE = 1; // 负向
    const ALL = 2; // 全部

    export default {
        props: {
            // 评价
            ratings: {
                type: Array,
                default() {
                    return []
                }
            },
            // 选择类型
            selectType: {
                type: Number,
                default: ALL
            },
            // 只看有内容的评价
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    } 
                }
            }
        },
        computed: {
            positive() {
                return this.ratings.filter(item => item.rateType === POSITIVE);
            },
            negative() {
                return this.ratings.filter(item => item.rateType === NEGATIVE);
            }
        },
        methods: {
            select(_type) {
                // 不能修改父组件传递过来(基本数据类型)的值
                // this.selectType = _type;

                // (基本数据类型)需要通过事件告诉父组件, 然后父组件去修改该值
                this.$emit('selected', _type);
            },
            toggleContent() {
                this.$emit('switch');
            }
        },  
    }
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/mixin';

    .ratingselect
        .rating-type
            padding 18px 0
            margin 0 18px
            border-1px(rgba(7, 17, 27, .1))
            .block
                display inline-block
                line-height 16px
                padding 8px 12px
                margin-right 8px
                border-radius 1px
                font-size 12px
                color rgb(77, 85, 93)
                &.active
                    color: #fff
                &.positive
                    background rgba(0, 160, 220, .2)
                    &.active
                        background rgb(0, 160, 220)
                &.negative
                    background rgba(77, 85, 93, .2)
                    &.active
                        background rgb(77, 85, 93)
                .count
                    margin-left 2px
                    font-size 8px
        .switch
            padding 12px 18px
            line-height 24px
            border-bottom 1px solid rgba(7, 17, 27, 0.1)
            color rgb(147, 153, 159)
            &.on
                .icon
                    color #00c850
            .icon
                display inline-block
                vertical-align top
                margin-right 4px
                font-size 24px
            .text
                display inline-block
                vertical-align top
                font-size 12px
</style>
