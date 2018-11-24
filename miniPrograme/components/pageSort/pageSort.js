const util = require('../../utils/util.js');
// 写评论
const api = require('../../utils/api.js');
/*
 *  self.triggerEvent('writeover');
 * */
Component({
    behaviors: [],
    properties: {
        pages: null // 简化的定义方式
    },
    data: {
        pageSortWidth: 0,
        touchStart: 0,
        moveItem: {},
        itemRange: [],
        scrollViewScrollPos: {},
        touchStartMoveItem: {
            top: 0,
            left: 0
        },
        touchStartMove: false,
    },
    onLoad(){
    },
    methods: {
        
        movePageTap(e){
            const index = util.data(e, "index");
            this.triggerEvent('sortPageClick', {
                index: index
            });
        },
        init(){
            try {
                const res = wx.getSystemInfoSync()
                this.setData({
                    windowHeight: res.windowHeight
                });

            } catch (e) {
                // Do something when catch error
            }


            this.fixSortContainerWidth();
            this.itemRangeFn();
        },
        fixSortContainerWidth(){
            this.setData({
                pageSortWidth: util.rpx2px(180 + 20 + 2) * this.properties.pages.length + 'px'
            });
        },


        closeSort() {

            this.triggerEvent('hidePage');

        },
        // 排序去掉当前页面
        removePage(e) {
            const index = util.data(e, "index");
            const id = util.data(e, "id");
            console.log(index, id);
            const pages = this.properties.pages;
            pages.splice(index, 1);
            this.setData({
                pages: pages
            });
            this.fixSortContainerWidth();

            this.triggerEvent('sortFinish', {
                pages: pages,
                // 显示删除元素的前一个
                needShowIndex: index - 1
            });
        },

        // 移动当前页面
        movePageLongPressItem(e) {


            const index = util.data(e, "index");
            const id = util.data(e, "id");

            const item = this.properties.pages[index];
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

            // const pages = this.properties.pages;
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

            // const pages = this.properties.pages;
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


            if (typeof this.data.moveItem.moveIndex !== "undefined") {
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
                if (this.properties.pages[moveIndex].canRemove) {
                    const pages = this.properties.pages;
                    console.log("移动前", JSON.stringify(pages));
                    util.swapArray(pages, this.data.moveItem.moveIndex, moveIndex);
                    this.setData({
                        pages: pages
                    });
                    console.log("移动后", JSON.stringify(pages));
                    this.triggerEvent('sortFinish', {
                        pages: pages,
                        // 显示移动后的下标（移动的当前元素）
                        needShowIndex: moveIndex
                    });
                } else {
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

            this.properties.pages.forEach(function (v, k) {
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
    }

});