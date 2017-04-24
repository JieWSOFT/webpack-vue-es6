import Vue from 'vue';
import smo from './smo.vue'
import router from './router'

new Vue({
    el: '#smo',
    router,
    render: h => h(smo)
});