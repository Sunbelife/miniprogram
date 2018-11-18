const util = require('../../utils/util.js');
// 写评论
const api = require('../../utils/api.js');
const app = getApp();
/*
 *  self.triggerEvent('writeover');
 * */
Component({
    behaviors: [],
    properties: {
        item: null // 简化的定义方式
    },
    data: {
        chooseMusic: '',
        activeType: 1,
        type: [
            {
                name: "全部",
                number: 1
            },
            {
                name: "华语",
                number: 2
            },
            {
                name: "日韩",
                number: 3
            },
            {
                name: "欧美",
                number: 4
            },
            {
                name: "纯音乐",
                number: 5
            }
        ],
        music: [],
        // 需要顶部固定吗？
        scrollTopPage: 0,
        isNeedFixed: false,
        titleHeight: 90,
        // changeTime: 300,
        // px
        tabOffsetTop: 90 + 90
    },
    ready(){
        this.genMusic();
    },
    methods: {
        hidePage(){
            this.triggerEvent('hidePage');
        },
        chooseType: function (e) {
            const type = util.data(e, "type");
            this.setData({
                activeType: type
            });
        },
        chooseMusic: function (e) {
            const no = util.data(e, "no");
            this.setData({
                chooseMusic: no
            });
        },
        saveSet(){
            this.hidePage();

        },
        genMusic(){
            const music = [];
            const arr = new Array(20).fill(0);
            util.each(arr, (k, v)=> {
                music.push({
                    no: k,
                    name: "音乐" + k,
                    audioUrl: ''
                });
            });
            this.setData({
                music: music
            });
        },
        loadMore(){

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

            console.log(px);
            //
            console.log(e);
        },
    }

});