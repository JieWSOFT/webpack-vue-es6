import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const test1 = resolve => {
    require.ensure(['../vue/components/test1.vue'], () => {
        resolve(require('../vue/components/test1.vue'));
    });
}
const test2 = resolve => {
    require.ensure(['../vue/components/test2.vue'], () => {
        resolve(require('../vue/components/test2.vue'));
    });
}
export default new Router({
    routes: [
        {
            path: '/test1',
            name: 'test1',
            components: {
                default: test1,
                a: test2
            }
            // component: test1,
            // children: [
            //     { path: 'test2', component: test2 }
            // ]

        }
    ]
})