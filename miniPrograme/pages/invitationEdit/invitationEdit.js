const app = getApp();
const util = require('../../utils/util.js');

/* 
 * 长按 取消 列表的滚动。移动复制的副本  
 * 停止移动，根据列表的滑动距离，确定要换的位置 
 * 
 * */
// todo 有的页面可以删除，有的页面不可以删除

/*
 *
 * todo  实时保存呢？请求接口呢？
 * todo 还是有一个保存按钮呢？
 * todo 还是存缓存，等发送再保存？ 还是下面叫保存按钮！！
 * 
 * 
 * 
 * 返回要记得保存
 * 
 * todo  添加新页面，设置，预览，保存  都在改页面
 * 
 *
 *
 模板上换图片  ，（跳到裁剪页）选择图片，裁剪。保存。，
 模板上换文字。本页。编辑框
 添加页面。  （跳到添加新页）   单图 ，多图，双图。文字
 页面排序。 删除页面。长按排序
 设置。  （跳到设置页面）  基本信息 ，音乐 ，弹幕 ，复制请帖，删除请帖
 预览  （跳到预览页面）  发送按钮
 发送 （跳到发送页面），设置封面图
 * */
Page({
    data: {
        pages: new Array(10).fill({}),
        isShowSort: false,
        isShowPageAdd: false,
        isShowPageSet: false,
        isShowPageSort: false,
        isShowInvitationInfo: false,
        isShowMusicChoose: false,
        isShowImgCut: false,
        isShowWordChange: false,
        id: 0
    },

    onLoad: function (options) {
        if (!options.id) {
            options.id = "123123";
        }
        this.setData({
            id: options.id
        });


        this.dataGen();
        this.pageDelHandle();

        if (app.globalData.isDev) {
            // 显示排序
            // this.showSort();
            // 显示新增页面
            // this.showPageAdd();
            // 设置页面设置
            // this.showPageSet();
            // 设置页面排序
            // this.showPageSort();
            // 显示图片裁剪
            // this.showImgCut();
            // 显示文字编辑
            // this.showWordChange();

            if(this.data.isShowPageSet){
                // 请帖信息编辑
                // this.showInvitationInfo();
                // 音乐选择
                // this.showMusicChoose();
            }

          

        }


    },
    dataGen(){
        const pages = this.data.pages;
        pages.forEach(function (v, k) {
            v.nameImage = encodeURIComponent(util.randomName());
            v.name = util.randomName();
            v.id = k;
            v.canRemove = 1;
        });
        console.log(pages);
        this.setData({
            pages: pages
        });
    },
    send(){
        this.goPage("invitationSend");
    },
    preview(){
        this.goPage("tplPreview");
    },
    pageDelHandle() {
        const pages = this.data.pages;
        pages[0].canRemove = 0;
        pages[pages.length - 1].canRemove = 0;
        this.setData({
            pages: pages
        });
    },
    // 显示 添加新页
    showPageAdd() {
        this.setData({
            isShowPageAdd: true
        });
        this.selectComponent("#pageAdd").show();
    },
    // 隐藏 添加新页
    hidePageAdd() {
        this.setData({
            isShowPageAdd: false
        });
    },
    // 显示 排序
    showPageSort() {
        this.setData({
            isShowPageSort: true
        });
        this.selectComponent("#pageSort").init();
    },
    // 隐藏 排序
    hidePageSort() {
        this.setData({
            isShowPageSort: false
        });
    },
    // 显示 页面设置
    showPageSet() {
        this.setData({
            isShowPageSet: true
        });
    },
    // 隐藏 页面设置
    hidePageSet() {
        this.setData({
            isShowPageSet: false
        });
    },
    // 显示 编辑页面
    showInvitationInfo() {
        this.setData({
            isShowInvitationInfo: true
        });
    },
// 隐藏 编辑页面
    hideInvitationInfo() {
        this.setData({
            isShowInvitationInfo: false
        });
    },
// 显示 音乐选择
    showMusicChoose() {
        this.setData({
            isShowMusicChoose: true
        });
    },
// 隐藏 音乐选择
    hideMusicChoose() {
        this.setData({
            isShowMusicChoose: false
        });
    },
// 显示 音乐选择
    showImgCut() {
        this.setData({
            isShowImgCut: true
        });
    },
// 隐藏 音乐选择
    hideImgCut() {
        this.setData({
            isShowImgCut: false
        });
    },
// 显示 音乐选择
    showWordChange() {
        this.setData({
            isShowWordChange: true
        });
    },
// 隐藏 音乐选择
    hideWordChange() {
        this.setData({
            isShowWordChange: false
        });
    },


    goPage: util.goPage

});
