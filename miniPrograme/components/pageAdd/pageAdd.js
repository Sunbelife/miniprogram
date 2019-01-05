const util = require('../../utils/util.js');
const tplConfig = require('../../utils/tplConfig.js');
// 写评论
const api = require('../../utils/api.js');
/*
 *  self.triggerEvent('writeover');
 * */
Component({
    behaviors: [],
    properties: {
        item: null // 简化的定义方式
    },
    data: {
        activeType: 1,
        type: [
            {
                name: "单图",
                number: 1
            },
            // {
            //     name: "双图",
            //     number: 2
            // },
            // {
            //     name: "多图",
            //     number: 3
            // },
            // {
            //     name: "纯文字",
            //     number: 4
            // }
        ],
        tpl: tplConfig.pageCanAdd,
        // 需要顶部固定吗？
        scrollTopPage: 0,
        isNeedFixed: false,
        isMove: false,
        ready: false,
        changeTime: 0,
        titleHeight: 90,
        // changeTime: 300,
        // px
        tabOffsetTop: 90 + 90
    },
    ready(){

        console.log("pageAdd 1",tplConfig.pageCanAdd);
        console.log("pageAdd 1",this.data.tpl);
        setTimeout(() => {
            // 页面 地图 表单影响加载。先这样处理
            this.setData({
                ready: true
            });
        }, 300);
    },
    methods: {
        chooseType: function (e) {
            const type = util.data(e, "type");
            this.setData({
                activeType: type
            });
        },
        loadMore(){

        },
        choosePage(e){
            const id = util.data(e, "id");
            this.triggerEvent('choosePage',id);
        },

        show(){
            this.setData({
                isMove: false
            });
            setTimeout(()=> {
                this.setData({
                    isMove: true
                })
            }, this.data.changeTime)
        },
        hidePageAdd(){
            this.setData({
                isMove: false
            });
            setTimeout(()=> {
                this.triggerEvent('hidePage');
            }, this.data.changeTime);
        },
        // 页面滚动回调
        pageScroll(e) {
            const px = util.rpx2px(this.data.tabOffsetTop);
            const scrollTop = e.detail.scrollTop;
            let isNeedFixed = false;

            if (scrollTop >= px) {
                isNeedFixed = true;
            }
            this.setData({
                isNeedFixed: isNeedFixed,
            });

            // console.log(px);
            //
            // console.log(e);
        },
    }

});