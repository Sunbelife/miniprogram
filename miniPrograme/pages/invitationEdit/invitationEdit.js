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
        pageSortWidth: 0,
        isShowSort: false,
        isShowPageAdd: false,
        isShowPageSet: false,
        touchStart: 0,
        moveItem: {},
        itemRange: [],
        scrollViewScrollPos: {},
        touchStartMoveItem: {
            top: 0,
            left: 0
        },
        touchStartMove: false,
        id: 0
    },

    onLoad: function (options) {
        if (!options.id) {
            options.id = "123123";
        }
        this.setData({
            id: options.id
        });
        try {
            const res = wx.getSystemInfoSync()
            this.setData({
                windowHeight: res.windowHeight
            });

        } catch (e) {
            // Do something when catch error
        }

        if (app.globalData.isDev) {
            // 显示排序
            // this.showSort();
            // 显示新增页面
            // this.showPageAdd();
            // 设置页面设置
            // this.showPageSet();
        }

        this.fixSortContainerWidth();
        this.dataGen();
        this.dataIndex();
        this.itemRangeFn();
        this.pageDelHandle();
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
    dataIndex(){
        const pages = this.data.pages;
        pages.forEach(function (v, k) {
            v.index = k;
        });
        console.log(pages);
        this.setData({
            pages: pages
        });
    },
    send(){
        this.goPage("invitationSend");
    },
    fixSortContainerWidth(){
        this.setData({
            pageSortWidth: util.rpx2px(180 + 20 + 2) * this.data.pages.length + 'px'
        });
    },
    pageDelHandle() {
        const pages = this.data.pages;
        pages[0].canRemove = 0;
        pages[pages.length - 1].canRemove = 0;
        this.setData({
            pages: pages
        });
    },
    showPageAdd() {
        this.setData({
            isShowPageAdd: true
        });

        this.selectComponent("#pageAdd").show();
        
        
    },
    hidePageAdd() {
        this.setData({
            isShowPageAdd: false
        });
    },
    showSort() {
        this.setData({
            isShowSort: true
        });
    },
    showPageSet() {
        this.setData({
            isShowPageSet: true
        });
    },
    hidePageSet() {
        this.setData({
            isShowPageSet: false
        });
    },
    pageClick() {
        this.setData({
            isShowSort: false
        });
    },
    closeSort() {
        this.setData({
            isShowSort: false
        });
    },
    // 排序去掉当前页面
    removePage(e) {
        const index = util.data(e, "index");
        const id = util.data(e, "id");
        console.log(index, id);
        const pages = this.data.pages;
        pages.splice(index, 1);
        this.setData({
            pages: pages
        });
        this.fixSortContainerWidth();
    },

    // 移动当前页面
    movePageLongPressItem(e) {


        const index = util.data(e, "index");
        const id = util.data(e, "id");

        const item = this.data.pages[index];
        // 不能删除的，也不能移动
        if (!item.canRemove) {
            wx.showToast({
                title: '不可移动该页面',
                icon: 'none',
                duration: 2000
            });

            return;
        }

        // 记录要移动的元素下标
        item.moveIndex = index;
        console.log(index, id);
        this.setData({
            moveItem: item,
            touchStartMove: true
        });
        console.log(this.data.touchStartMove);

    },
    setMoveItemPos(touch){
        setTimeout(()=> {
            this.setData({
                touchStartMoveItem: {
                    // bottom: (this.data.windowHeight - touch.clientY - util.rpx2px(300) / 2) + "px",
                    top: (touch.clientY - util.rpx2px(300) / 2) + "px",
                    left: (touch.clientX - util.rpx2px(180) / 2) + "px"
                }
            });
        }, 0)
        console.log(this.data.touchStartMoveItem);
    },
    // 移动当前页面
    movePageStart(e) {
        console.log(e);
        console.log(e.touches[0]);
        console.log(e.touches[0].pageX);
        this.setData({
            touchStart: e.touches[0].pageX
        });

        this.setMoveItemPos(e.touches[0]);

        // const pages = this.data.pages;
        // pages.splice(index, 1);
        // this.setData({
        //     pages: pages
        // });
        // this.fixSortContainerWidth();


    },
    // 移动当前页面
    movePageMove(e) {
        // console.log(e);
        this.setData({
            touchEnd: e.touches[0].pageX
        });
        this.setMoveItemPos(e.touches[0]);

        const index = util.data(e, "index");
        const id = util.data(e, "id");


        // console.log(index, id);

        // const pages = this.data.pages;
        // pages.splice(index, 1);
        // this.setData({
        //     pages: pages
        // });
        // this.fixSortContainerWidth();


    },

    scrollViewScroll(e){
        this.setData({
            scrollViewScrollPos: e
        });

    },
    // 移动当前页面
    movePageEnd(e) {
        // console.log(e);
        const index = util.data(e, "index");
        const id = util.data(e, "id");
        // console.log(this.data.touchStartMove);

        if (this.data.touchStartMove) {
            console.log(this.data.touchEnd, this.data.touchStart);
        }

        this.setData({
            touchStartMove: false
        });


        if (typeof this.data.moveItem.index !== "undefined") {
            console.log(this.data.scrollViewScrollPos);

            const scrollViewScrollPos = this.data.scrollViewScrollPos;
            let scrollLeft = 0;

            // 初次为空的
            if (scrollViewScrollPos.detail) {
                scrollLeft = scrollViewScrollPos.detail.scrollLeft
            }
            let moveIndex = -1;
            this.data.itemRange.forEach((v, k)=> {

                if (moveIndex !== -1) {
                    return;
                }
                if (v > scrollLeft + this.data.touchEnd) {
                    console.log(v, scrollLeft, this.data.touchEnd);
                    moveIndex = k;
                }
            });
            console.log("要交换的下标", moveIndex);
            console.log("移动的下标", this.data.moveItem.moveIndex);

            // 目标页面可以删除，才可以交换
            if(this.data.pages[moveIndex].canRemove){
                const pages = this.data.pages;
                console.log("移动前", JSON.stringify(pages));
                util.swapArray(pages, this.data.moveItem.moveIndex, moveIndex);
                this.setData({
                    pages: pages
                });
                console.log("移动后", JSON.stringify(pages));
            }else{
                wx.showToast({
                    title: '不能与该页面交换位置',
                    icon: 'none',
                    duration: 2000
                });
            }


        }

        // 清楚记录
        this.setData({
            moveItem: {}
        });

    },
    // 滑动项目的区间
    itemRangeFn(){
        const itemRangeRpx = [];
        const itemRangePx = [];

        this.data.pages.forEach(function (v, k) {
            const rpx = (k + 1) * 200 + 30;
            itemRangeRpx.push(rpx);
            itemRangePx.push(util.rpx2px(rpx));
        });
        console.log(itemRangeRpx);
        console.log(itemRangePx);
        this.setData({
            itemRange: itemRangePx
        });

    },
    goPage: util.goPage

});
