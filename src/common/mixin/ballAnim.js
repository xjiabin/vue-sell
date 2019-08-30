import Ball from '@/components/Ball/Ball';
import create from '@/services/create';

export default {
    methods: {
        addCart(el) {
            const props = { el }
            // 创建动画
            const anim = create(Ball, { props });
            // 开始动画
            anim.start();

            // 动画结束销毁实例
            anim.$on('transitionend', () => {
                anim.remove();
            });
        },
    },
}
