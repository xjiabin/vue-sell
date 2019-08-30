<template>
    <transition name="fade">
        <div class="dialog" v-show="showDialog">
            <div class="dialog-mask" v-if="showMask" @click="clickMask"></div>

            <div class="dialog-container">
                <div class="dialog-title" v-if="titleContent" v-html="titleContent"></div>
                <div class="dialog-title" v-else>
                    {{ title }}
                </div>
                <div class="dialog-content">
                    <p>{{ msg }}</p>
                </div>
                <div class="dialog-btns">
                    <div class="dialog-btn cancel-btn" v-if="showCancel" @click="cancelBtn">{{ cancelText }}</div>
                    <div class="dialog-btn confirm-btn" @click="confirmBtn">{{ confirmText }}</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    const EVENT_CONFIRM = 'confirm';
    const EVENT_CANCEL = 'cancel';
    const EVENT_CLICK_MASK = 'clickMask';

    export default {
        props: {
            title: {
                type: String,
                default: '提示'
            },
            titleContent: {
                type: String,
                default: ''
            },
            msg: {
                type: String,
                default: '这是一条提示信息'
            },
            confirmText: {
                type: String,
                default: '确认'
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            showCancel: {
                type: Boolean,
                default: true
            },
            showMask: {
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                showDialog: false
            }
        },
        methods: {
            show() {
                this.showDialog = true;
            },
            hide() {
                this.showDialog = false;
                setTimeout(() => {
                    this.remove && this.remove();
                }, 400);
            },
            confirmBtn() {
                this.$emit(EVENT_CONFIRM);
            },
            cancelBtn() {
                this.$emit(EVENT_CANCEL);
            },
            clickMask() {
                this.$emit(EVENT_CLICK_MASK);
            },
        },
    }
</script>

<style lang="stylus" scoped>
.dialog
    &.fade-enter, &.fade-leave-active
        opacity 0
    &.fade-enter-active, &.fade-leave-active
        transition all .4s ease-in-out
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 99999
    width 100%
    height 100%
    .dialog-mask
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background-color rgba(7, 17, 27, .2);
    .dialog-container
        position absolute
        top 50%
        left 50%
        width 270px
        background-color #fff
        transform translate(-50%, -50%)
        border-radius 8px
        overflow hidden
        .dialog-title
            font-size 16px
            padding 10px 20px
            text-align center
            color #000
        .dialog-content
            margin 16px 0
            padding 0 16px
            color #666
            text-align center
            & > p
                display table
                margin auto
        .dialog-btns
            width 100%
            overflow hidden
            border-top 1px solid rgba(7, 17, 27, .1)
            .dialog-btn
                float: left;
                width: 50%;
                line-height: 1;
                padding: 17px 10px;
                margin: 0;
                background-clip: padding-box;
                background-color: #fff;
                color: #999;
                font-size: 16px;
                text-align: center;
                box-sizing: border-box;
                &.confirm-btn
                    color #fc9153

</style>