<template>
    <div class="page">
        <!--<h1>登录</h1>-->


        <el-row>
            <el-col :span="12" class="leftArea">
                <img alt="Vue logo" src="../assets/logo.png">
            </el-col>
            <el-col :span="12" class="split">
                <div class="form-wrap">
                    <el-form ref="form" :model="form" :rules="rules4Login"
                             :hide-required-asterisk="true"
                             label-width="80px" :label-position="'left'">
                        <el-form-item label="用户名" prop="user">
                            <el-input v-model="form.user"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pwd">
                            <el-input v-model="form.pwd"></el-input>
                        </el-form-item>
                        <el-form-item label="" class="text-left">
                            <el-checkbox v-model="form.checked">记住密码</el-checkbox>
                        </el-form-item>
                        <el-form-item class="">
                            <el-button type="primary" @click="onSubmit" :loading="loading"
                            >登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {
        request,
        api
    } from '@/util/api'
    import util from '@/util/util'
    import localstorage from '@/util/localstorage'

    export default {
        name: 'HelloWorld',
        data() {
            return {
                loading: false,
                form: {
                    user: '',
                    pwd: '',
                    checked: true,
                },
                rules4Login: {
                    user: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                }
            }
        },
        mounted() {


            this.loginCheck();

            if (util.isLocal) {
                // this.setVal();
            }
        },
        methods: {
            loginCheck() {
                const loginUser = localStorage.getItem("loginUser");
                const loginUserPwd = localStorage.getItem("loginUserPwd");

                this.form.user = loginUser;
                if (loginUserPwd) {
                    this.form.pwd = loginUserPwd;
                    this.form.checked = true;
                }
            },
            setVal() {
                this.form.user = "admin";
                this.form.pwd = "admin";
            },

            onSubmit() {
                console.log('submit!');
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        console.log(api.login, {
                            user_name: this.form.user,
                            pass_word: this.form.pwd
                        });
                        request.get(api.login, {
                            params: {
                                user_name: this.form.user,
                                pass_word: this.form.pwd
                            }
                        }).then((response) => {
                            console.log(response);
                            this.loading = false;

                            if (response.code === 200) {
                                // 1个小时
                                localstorage.setAge(60 * 60 * 1000).set('loginSessionId', 'abc');

                                localStorage.setItem("loginUser", this.form.user);
                                if (this.form.checked) {
                                    localStorage.setItem("loginUserPwd", this.form.pwd);
                                } else {
                                    localStorage.removeItem("loginUserPwd");
                                }

                                this.goPage('home');
                            } else {
                                this.$message({
                                    message: response.msg,
                                    showClose: true,
                                    type: 'error'
                                });
                            }
                        }).catch(function (error) {
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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