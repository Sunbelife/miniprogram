<template>
    <div class="about">
        <!--<h1>赴宴信息</h1>-->
        <Nav :activeIndex="2"></Nav>

        <div class="page-content">
            <div class="page-form" v-if="false">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="新郎姓名">
                        <el-input v-model="formInline.user" placeholder="新郎姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="新娘姓名">
                        <el-input v-model="formInline.user" placeholder="新娘姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="name"-->
                        <!--label="请帖编号">-->
                <!--</el-table-column>-->
                <el-table-column
                        align="center"
                        prop="create_time"
                        width="160"
                        label="创建时间">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="man"
                        label="新郎姓名">
                    <!--<template slot-scope="scope">{{ // scope.row.date }}</template>-->
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="women"
                        label="新娘姓名">
                </el-table-column>

                <el-table-column
                        align="center"
                        width="160"
                        prop="marr_time"
                        label="结婚时间">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="marr_addr"
                        label="结婚地址">
                </el-table-column>
                <el-table-column
                        align="center"
                        width="160"
                        prop="contact_num"
                        label="联系电话">
                </el-table-column>


                <el-table-column
                        align="center"
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleDelClick(scope.row)" type="text" size="small">
                            查看赴宴信息
                        </el-button>
                    </template>
                </el-table-column>
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
        data(){
            return {
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
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
                request.get(api.marryInfo, {}).then((response) => {
                    console.log(response);
                    if (response.code === 200) {
                        this.tableData = dataHelper.marryInfo(response.data);
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
            toggleSelection(rows) {
                const that = this;
                if (rows) {
                    rows.forEach(function (row) {
                        that.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleDelClick(item) {
                console.log(item);
                let card_id = item.card_id;
                // id = 1;
                console.log("banquetList/" + card_id);
                this.goPage("banquetList/" + card_id);
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