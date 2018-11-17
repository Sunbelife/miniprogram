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
* */
Page({
    data: {
        pages: new Array(10).fill({}),
        isShowSort: false,
        isShowPageAdd: false,
        isShowPageSet: false,
        isShowPageSort: false,
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
    
  
    goPage: util.goPage

});
