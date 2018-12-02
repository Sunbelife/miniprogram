<template>
    <div class="page">
        <!--<h1>登录</h1>-->


        <el-row>
            <el-col :span="12" class="leftArea">
                <img alt="Vue logo" src="../assets/logo.png">
            </el-col>
            <el-col :span="12" class="split">
                <div class="form-wrap">
                    <el-form ref="form" :model="form" label-width="80px" :label-position="'left'">
                        <el-form-item label="用户名">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="" class="text-left">
                            <el-checkbox v-model="form.checked">记住密码</el-checkbox>
                        </el-form-item>
                        <el-form-item class="">
                            <el-button type="primary" @click="onSubmit">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: 'HelloWorld',
        data(){
            return {
                form: {
                    name: '',
                    checked: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
                this.goPage("home");
            }
        }
    }
</script>

<style scoped>
    .page {
        padding-top: 150px;
    }

    .leftArea {
        padding-left: 50px;
        padding-top: 50px;
    }

    .split {
        border-left: 1px solid #ddd;
        padding-left: 50px;
        padding-top: 50px;

    }
</style>