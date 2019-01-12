import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import Login from './views/Login.vue'
import InvitationList from './views/InvitationList.vue'
import BanquetList from './views/BanquetList.vue'
import H5TplList from './views/H5TplList.vue'
import MusicList from './views/MusicList.vue'
import Nav from './views/Nav.vue'
import followPublicNo from './views/followPublicNo.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: "/login"
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '原野映像 - 登录'
            },
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                title: '原野映像'
            },
            component: Home
        },
        {
            path: '/invitationList',
            name: 'invitationList',
            meta: {
                title: '原野映像 - 请帖列表'
            },
            component: InvitationList
        },
        {
            path: '/followPublicNo',
            name: 'followPublicNo',
            meta: {
                title: '原野映像'
            },
            component: followPublicNo
        },
        {
            path: '/banquetList/:id',
            name: 'banquetList',
            meta: {
                title: '原野映像 - 赴宴信息'
            },
            component: BanquetList
        },
        {
            path: '/h5TplList',
            name: 'h5TplList',
            meta: {
                title: '原野映像 - 小程序模板'
            },
            component: H5TplList
        },
        {
            path: '/musicList',
            name: 'musicList',
            meta: {
                title: '原野映像 - 音乐管理'
            },
            component: MusicList
        },
        {
            path: '/nav',
            name: 'nav',
            meta: {
                title: '原野映像 - 导航'
            },
            component: Nav
        },
        {
            path: '**',
            redirect: "/"
        }
    ]
})
