<template>
    <div class="about">
        <!--<h1>赴宴信息</h1>-->
        <Nav :activeIndex="2"></Nav>


        <div class="page-content">
            <!--<div class="page-form">-->
            <!--<el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">-->
            <!--<el-form-item label="新娘名称">-->
            <!--<el-input v-model="formInline.user" placeholder="新娘名称"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="新娘名称">-->
            <!--<el-input v-model="formInline.user" placeholder="新娘名称"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
            <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
            <!--</el-form-item>-->
            <!--</el-form>-->
            <!--</div>-->

            <el-breadcrumb separator="/" class="page-breadcrumb">
                <el-breadcrumb-item :to="{ path: '/invitationList' }">请帖列表</el-breadcrumb-item>
                <el-breadcrumb-item>赴宴信息</el-breadcrumb-item>
            </el-breadcrumb>


            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <!--<el-table-column-->
                <!--type="selection"-->
                <!--width="55">-->
                <!--</el-table-column>-->
                <el-table-column
                        align="center"
                        label="赴宴人员">
                    <template slot-scope="scope">{{ scope.row.user_name }}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="phone_num"
                        label="赴宴联系电话">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="attend_num"
                        label="赴宴人数"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="transit_type"
                        label="交通工具"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="attend_time"
                        label="赴宴时间"
                        show-overflow-tooltip>
                </el-table-column>
                <!--<el-table-column-->
                <!--align="center"-->
                <!--fixed="right"-->
                <!--label="操作">-->
                <!--<template slot-scope="scope">-->
                <!--<el-button @click="handleDelClick(scope.row)" type="text" size="small">-->
                <!--删除-->
                <!--</el-button>-->
                <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <!--<div style="margin-top: 20px">-->
            <!--<el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>-->
            <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
            <!--</div>-->

            <div class="page-pagination" v-if="false">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </div>


            <!-- Form -->


            <el-dialog title="添加音乐" :visible.sync="dialogFormVisible">
                <el-form :model="form" :label-position="'left'">
                    <el-form-item label="音乐名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="类别" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="请选择类别">
                            <el-option label="欧美" value="shanghai"></el-option>
                            <el-option label="中文" value="beijing"></el-option>
                            <el-option label="日韩" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>


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
                tableData: [],
                multipleSelection: [],
                currentPage4: 4,
                formInline: {
                    user: '',
                    region: ''
                },
                dialogFormVisible: false,
//                dialogFormVisible: true,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '100px'
            }
        },
        mounted() {

            this.getList();
        },
        methods: {
            getList() {
                request.get(api.banquetInfo, {
                    params: {
                        card_id: this.$route.params.id
                    }
                }).then((response) => {
                    console.log(response);
                    if (response.code === 200) {
                        this.tableData = dataHelper.banquetInfo(response.data);
                        console.log(this.tableData);
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
//            toggleSelection(rows) {
//                const that = this;
//                if (rows) {
//                    rows.forEach(function (row) {
//                        that.$refs.multipleTable.toggleRowSelection(row);
//                    });
//                } else {
//                    this.$refs.multipleTable.clearSelection();
//                }
//            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleDelClick(item) {
                console.log(item);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            onSubmit() {
                console.log('submit!');
            },
            add() {
                this.dialogFormVisible = true;
                console.log('add');
            }
        }
    }
</script>

<style>

</style>