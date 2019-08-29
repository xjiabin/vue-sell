import Vue from 'vue';

/**
 * 创建全局(js调用)组件的方法
 * @param {*} Component 组件对象
 * @param {*} props 需要传递给组件的参数
 */
function create(Component, context) {

    // 创建新的Vue实例
    // 在文档之外渲染并且随后挂载
    const instance = new Vue({
        // render 函数的使用：https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6
        render: h => h(Component, context)
    }).$mount(); // $mount() 如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。

    // 使用原生 DOM API 把它插入文档中
    document.body.appendChild(instance.$el);

    // 获取当前实例的直接子组件
    const component = instance.$children[0];
    
    // 挂载销毁实例的方法
    component.remove = function() {
        instance.$destroy();
        document.body.removeChild(instance.$el);
    }

    // 返回该组件
    return component;
}

export default create;
