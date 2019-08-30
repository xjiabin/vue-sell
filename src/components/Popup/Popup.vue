<template>
    <div class="popup" :class="rootClass" :style="{'z-index': zIndex}">
        <div class="popup-mask" @click="maskClick">
            <slot name="mask"></slot>
        </div>
        <div class="popup-container" :class="containerClass">
            <div class="popup-content" v-if="$slots.default">
                <slot></slot>
            </div>
            <div class="popup-content" v-else v-html="content"></div>
        </div>
    </div>
</template>

<script>
    const EVENT_MASK_CLICK = 'mask-click'

    export default {
        props: {
            mask: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                default: ''
            },
            center: {
                type: Boolean,
                default: true
            },
            position: {
                type: String,
                default: '',
            },
            content: {
                type: String,
                default: ''
            },
            zIndex: {
                type: String,
                default: ''
            }
        },
        computed: {
            rootClass() {
                const cls = {
                    'popup_mask': this.mask
                }
                if (this.type) {
                    cls[this.type] = true
                }
                return cls;
            },
            containerClass() {
                const center = this.center;
                const position = this.position;
                if (position) {
                    return {
                        [`popup-${position}`]: true
                    }
                }
                if (center) {
                    return {
                        'popup-center': true
                    }
                }
            }
        },
        methods: {
            maskClick(e) {
                this.$emit(EVENT_MASK_CLICK, e)
            }
        },
    }
</script>

<style lang="stylus" scoped>
.popup
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 999
    pointer-events none
.popup_mask
    pointer-events auto
    .popup-mask
        display block
.popup-mask, .popup-container
    position absolute
    width 100%
    height 100%
.popup-mask
    display none
    overflow hidden
    background-color #07111b
    opacity .6
    // fix some android webview opacity render bug
    &::before
      content: "."
      display: block
      width: 1px
      height: 1px
      background-color: rgba(0, 0, 0, .1)
      margin-left: -10px
.popup-container
    transform: translate(100%, 100%)
.popup-content
    position: absolute
    top: 0
    left: 0
    width: 100%
    box-sizing: border-box
    transform: translate(-100%, -100%)
    pointer-events: auto
.popup-center,
.popup-right,
.popup-left
    .popup-content
        top: -50%
        left: -50%
        width: auto
        max-width: 100%
        transform: translate(0, 0)
.popup-right,
.popup-left
    .popup-content
        height: 100%
        top: -100%
.popup-center
    .popup-content
        transform: translate(-50%, -50%)
.popup-top
    .popup-content
        top: -100%
        left: -100%
        transform: translate(0, 0)
.popup-right
    .popup-content
        top: -100%
        right: 100%
.popup-left
    .popup-content
        left: -100%
</style>