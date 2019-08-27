# vue-sell

## 1px边框
> 给需要添加边框的元素添加一个伪类`after`，把`after`设置成一条线，然后在不同 dpr 的设备中通过`media query`给这个线进行缩放

```stylus
border-1px($color = #ccc, $radius = 2PX, $style = solid)
    position: relative
    &::after
        content: ""
        pointer-events: none
        display: block
        position: absolute
        left: 0
        top: 0
        transform-origin: 0 0
        border-bottom: 1PX $style $color
        border-radius: $radius
        box-sizing border-box
        width 100%
        height 100%
        @media (min-resolution: 2dppx)
            width: 200%
            height: 200%
            border-radius: $radius * 2
            transform: scale(.5)
        @media (min-resolution: 3dppx)
            width: 300%
            height: 300%
            border-radius: $radius * 3
            transform: scale(.333)
```

## @2x和@3x背景图

```styl
bg-image($url, $ext = ".png")
    background-image: url($url + "@2x" + $ext)
    @media (min-resolution: 3dppx)
        background-image: url($url + "@3x" + $ext)

```

## 星星评分组件
> 星星的显示与评分，星星的尺寸有关

为了组件的可扩展性，根据传入的评分，尺寸来动态显示星星评分

```js
props: {
    size: {
        type: Number
    },
    score: {
        type: Number
    }
},
```

通过`score`与`size`获取样式`starType`
```js
computed: {
    starType() {
        return 'star-' + this.size
    }
},
```

通过`score`获取星星对象`itemClasses`
```js
itemClasses() {
    let result = [];
    // 向下取0.5的倍数
    let score = Math.floor(this.score * 2) / 2;
    // 判断是否有半星
    let hasDecimal = score % 1 !== 0;
    // 获取全星的个数
    let integer = Math.floor(score);

    // 添加全星
    for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
    }
    // 如果有半星，添加半星（半星只会有一个）
    if (hasDecimal) {
        result.push(CLS_HALF);
    }
    // 补齐星星个数（若星星个数不足5个）
    while(result.length < LENGTH) {
        result.push(CLS_OFF);
    }

    return result;
}
```

完整代码
```html
<template>
    <div class="star" :class="starType">
        <span v-for="(item,index) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>
const LENGTH = 5; // 星星个数
const CLS_ON = 'on'; // 全星
const CLS_HALF = 'half'; // 半星
const CLS_OFF = 'off'; // 无星

export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType() {
            return 'star-' + this.size
        },
        itemClasses() {
            let result = [];
            // 向下取0.5的倍数
            let score = Math.floor(this.score * 2) / 2;
            // 判断是否有半星
            let hasDecimal = score % 1 !== 0;
            // 获取全星的个数
            let integer = Math.floor(score);

            // 添加全星
            for (let i = 0; i < integer; i++) {
                result.push(CLS_ON);
            }
            // 如果有半星，添加半星（半星只会有一个）
            if (hasDecimal) {
                result.push(CLS_HALF);
            }
            // 补齐星星个数（若星星个数不足5个）
            while(result.length < LENGTH) {
                result.push(CLS_OFF);
            }

            return result;
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.star
    font-size 0
    .star-item
        display inline-block
        background-repeat no-repeat
    &.star-48
        .star-item
            width 20px
            height 20px
            margin-right 22px
            background-size 20px 20px
            &:last-child
                margin-right 0
            &.on
                bg-image('star-48_on')
            &.half
                bg-image('star-48_half')
            &.off
                bg-image('star-48_off')
    &.star-36
        .star-item
            width 15px
            height 15px
            margin-right 6px
            background-size 15px 15px
            &:last-child
                margin-right 0
            &.on
                bg-image('star-36_on')
            &.half
                bg-image('star-36_half')
            &.off
                bg-image('star-36_off')
    &.star-24
        .star-item
            width 10px
            height 10px
            margin-right 3px
            background-size 10px 10px
            &:last-child
                margin-right 0
            &.on
                bg-image('star-24_on')
            &.half
                bg-image('star-24_half')
            &.off
                bg-image('star-24_off')
</style>
```


## 两边有（自适应宽度的）线条的标题

