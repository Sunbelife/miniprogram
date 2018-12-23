<template>
    <div class="page">

        <!--<h1>音乐管理</h1>-->
        <Nav :activeIndex="1"></Nav>

        <!--

        -->

        <div class="page-content">
            <div class="page-form">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                    <el-form-item label="音乐名称">
                        <el-input v-model="formInline.name" placeholder="音乐名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch">查询</el-button>
                    </el-form-item>
                    <el-form-item class="fr">
                        <el-button type="primary" @click="add">
                            <i class="fa fa-plus"></i>
                            上传
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div style="height: 70px;">
                <aplayer autoplay
                         v-if="playHas"
                         :music="playOption"
                />
                <div v-if="!playHas">音乐播放区域</div>
            </div>

            <!--<aplayer autoplay
                     :music="{
                        title: 'secret base~君がくれたもの~',
                        artist: 'Silent Siren',
                        src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
                        pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                      }"
            />-->

            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <!--<el-table-column-->
                <!--type="selection"-->
                <!--width="55">-->
                <!--</el-table-column>-->
                <el-table-column
                        align="center"
                        prop="name"
                        label="音乐名称">
                    <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="time"
                        label="上传时间">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="type"
                        label="类别"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="播放">
                    <template slot-scope="scope">
                        <el-button @click="playThis(scope.row)" type="text" size="small">
                            播放
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleDelClick(scope.row)" type="text" size="small">
                            删除
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


            <!-- Form -->

            <!--submit-->
            <el-dialog title="添加音乐" :visible.sync="dialogFormVisible">
                <el-form :model="form" :label-position="'left'"
                         :rules="rules4Add"
                         ref="form4Add"
                         :hide-required-asterisk="true"
                >
                    <el-form-item label="音乐名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="音乐文件" :label-width="formLabelWidth">
                        <el-upload
                                class="upload-demo"
                                ref="upload"
                                :action="baseURL + api.musicUpload"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-success="handleSuccess"
                                :on-error="handleError"
                                :accept="'.mp3'"
                                :on-change="handleChange"
                                :before-remove="beforeRemove"
                                :auto-upload="false"

                                :data="uploadData"
                                :name="'music'"
                                multiple
                                :limit="1"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传MP3文件</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="类别" :label-width="formLabelWidth">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmit" :loading="loading">确 定</el-button>
                </div>
            </el-dialog>

        </div>
    </div>
</template>
<script>
    import Nav from '@/components/Nav.vue'
    import {
        request,
        baseURL,
        api
    } from '@/util/api'
    import util from '@/util/util'
    import dataHelper from '@/util/dataHelper'
    import Aplayer from 'vue-aplayer'

    export default {
        name: 'HelloWorld',
        components: {
            Nav,
            Aplayer
        },
        data() {
            return {

                fileList: [],

                options: [{
                    value: '1',
                    label: '中文'
                }, {
                    value: '2',
                    label: '外文'
                }],
                tableData: [],
                uploadData: {},
                api: api,
                multipleSelection: [],
                currentPage4: 4,
                baseURL: baseURL,
                formInline: {
                    user: '',
                    region: 1
                },
                dialogFormVisible: false,
//                dialogFormVisible: true,
                form: {
                    name: '',
                    type: '1'
                },
                formLabelWidth: '100px',
                rules4Add: {
                    name: [
                        {required: true, message: '请输入音乐名', trigger: 'blur'}
                    ],
                },
                uploadFileList: [],
                playHas: false,
                playOption: {
                    artist: "",
                    title: "",
                    src: "",
                },
                loading: false

            }
        },
        mounted() {

            this.getList();
        },
        methods: {
            onSearch() {
                this.getList();

            },
            playThis(item) {
                this.playHas = false;

                console.log(item);
                this.playOption.title = item.name;
                this.playOption.src = item.src;

                setTimeout(() => {
                    this.playHas = true;
                }, 300)
            },
            onSubmit() {
                console.log(this.fileList);
                if (this.uploadFileList.length === 0) {
                    this.$message({
                        message: '未上传文件',
                        type: 'warning'
                    });
                    return;
                }
                console.log('submit!');
                this.$refs.form4Add.validate((valid) => {
                    if (valid) {
                        this.loading = true;

                        this.uploadData.music_name = this.form.name;
                        this.uploadData.music_type = this.form.type;

                        this.$refs.upload.submit();
                        this.dialogFormVisible = false;
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });


            },
            handleSuccess(file, fileList) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                this.getList();

            },
            handleError(file, fileList) {
                this.$message.error('上传失败');
            },
            handleChange(file, fileList) {
                console.log(file, fileList);
                this.uploadFileList = fileList;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            getList() {
                request.get(api.musicList, {
                    params: {
                        search_music: this.formInline.name
                    }
                }).then((response) => {
                    console.log(response);
                    if (response.code === 200) {
                        this.tableData = dataHelper.musicList(response.data);
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

                this.$confirm('删除该音乐, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    request.get(api.musicDel, {
                        params: {
                            music_id: item.id
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

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            add() {
                this.form.name = "";
                this.fileList = [];
                this.uploadFileList = [];
                this.dialogFormVisible = true;
                // this.$refs.form4Add.resetFields();
                console.log('add');
            }
        }
    }
</script>

<style>

</style>