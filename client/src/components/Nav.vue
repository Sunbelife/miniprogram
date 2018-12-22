<template>
    <div class="nav-wrap">
        <el-menu
                :default-active="activeIndex+''"
                class="nav-main"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                :router="true"
                active-text-color="#ffd04b">
            <el-menu-item index="4" :route="{path:'/home'}">
                <i class="fa fa-home"></i>主页
            </el-menu-item>
            <el-menu-item index="1" :route="{path:'/musicList'}">
                <i class="fa fa-music"></i>音乐管理
            </el-menu-item>
            <el-menu-item index="2" :route="{path:'/invitationList'}">
                <i class="fa fa-address-book"></i>
                请帖列表
            </el-menu-item>
            <!--<el-menu-item index="3" :route="{path:'/h5TplList'}">-->
                <!--<i class="fa fa-weixin"></i>-->
                <!--小程序模板-->
            <!--</el-menu-item>-->
        </el-menu>
        <div class="nav-other" @click="logout">
            退出
        </div>
    </div>
</template>

<script>
    import localstorage from '@/util/localstorage'
    export default {
        name: 'Nav',
        props: {
            activeIndex: Number
        },
        data() {
            return {};
        },
        methods: {
            logout(){
                window.localStorage.removeItem('loginSessionId');

                this.goPage("/");
            }
        }
    }
</script>

<style scoped lang="scss">
    .nav-main .fa {
        margin-right: 5px;
    }

    .nav-main {
        flex: 1;
    }

    .nav-wrap {
        display: flex;
    }

    .nav-other {
        width: 100px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: white;
        cursor: pointer;
        background-color: rgb(84, 92, 100);
        &:hover{
             background-color: rgb(67, 74, 80);

         }
    }
</style>
