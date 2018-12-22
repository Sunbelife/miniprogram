import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import localstorage from '@/util/localstorage'

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false


Vue.mixin({
    methods: {
        // 跳页面
        goPage: function (page) {
            router.push(page);
        }
    }
});

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    const whiteList = ["/login"];

    let loginSessionId = localstorage.get("loginSessionId");

    console.log(loginSessionId);
    if (whiteList.indexOf(to.fullPath) !== -1 || loginSessionId) {
        next();
    } else {
        next("/login");
    }
});


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
