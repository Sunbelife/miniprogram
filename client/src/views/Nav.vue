<template>
    <!--<div class="about">-->
    <!--<h1>This is an about page</h1>-->
    <!--</div>-->

    <div class="page">
        <template v-for="item in nav">
            <el-button :type="item.isOk ? 'success' : 'primary' " @click="goPage(item.path)">
                {{item.name}}
            </el-button>
        </template>
    </div>


</template>
<script>
    export default {
        name: 'HelloWorld',
        data(){
            return {
                nav: [
                    {
                        name: "登录",
                        isOk: false,
                        path: "/login"
                    },
                    {
                        name: "主页",
                        isOk: false,
                        path: "/home"
                    },
                    {
                        name: "请帖列表",
                        isOk: false,
                        path: "/invitationList"
                    },
                    {
                        name: "赴宴信息",
                        isOk: false,
                        path: "/banquetList/1"
                    },
                    {
                        name: "小程序模板",
                        isOk: false,
                        path: "/h5TplList"
                    },
                    {
                        name: "音乐管理",
                        isOk: false,
                        path: "/musicList"
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .page {
        padding-top: 150px;
    }
</style>