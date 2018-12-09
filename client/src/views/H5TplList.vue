<template>
    <div class="page">
        <!--<h1>小程序模板</h1>-->
        <Nav :activeIndex="3"></Nav>


        <div class="page-content">
            <el-row>
                <template v-for="item in tpl">
                    <div class="tplItem-wrap">
                        <div class="tplItem">
                            <img :src="item.cover" alt="" class="tplItem-img">
                            <div class="tplItem-name">
                                {{'模板'+item.name}}
                                <el-button type="text" size="mini" class="fr" @click="handleDelClick(item)">删除
                                </el-button>
                            </div>
                            <div class="tplItem-handle">
                            </div>
                        </div>
                    </div>
                </template>
            </el-row>
        </div>


    </div>
</template>
<script>
    import Nav from '@/components/Nav.vue'
    import {
        request,
        api
    } from '@/util/api'
    import util from '@/util/util'
    import dataHelper from '@/util/dataHelper'

    export default {
        name: 'HelloWorld',
        components: {
            Nav
        },
        data() {
            return {
                tpl: [
                    // 1, 2, 3, 4, 5, 6
                ]
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                request.get(api.tplList, {}).then((response) => {
                    console.log(response);
                    if (response.code === 200) {
                        this.tpl = dataHelper.tplList(response.data);
                        console.log(this.tpl);
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
            },
            handleDelClick(item) {

                console.log(item);

                this.$confirm('删除该模板, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    request.get(api.tplDel, {
                        params: {
                            model_id: item.id
                        }
                    }).then((response) => {
                        console.log(response);
                        if (response.code === 200) {
                            this.$message({
                                showClose: true,
                                type: 'success',
                                message: '删除成功!'
                            });
                            // 重获取列表
                            this.getList();
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

                }).catch(() => {
                    this.$message({
                        showClose: true,
                        duration: 1000,
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            }
        }
    }
</script>

<style scoped lang="scss">

    .tplItem-wrap {
        padding: 10px;
        width: 20%;
        float: left;

    }

    .tplItem {
        padding: 10px;
        /*border: 1px solid #ddd;*/
        border-radius: 5px;
        box-shadow: 3px 3px 3px #ddd;
    }

    .tplItem-img {
        width: 100%;
        min-height: 200px;
    }

    .tplItem-name {
        text-align: center;
    }

    .tplItem-handle {
        /*padding: 10px 0;*/
        text-align: right;
    }


</style>