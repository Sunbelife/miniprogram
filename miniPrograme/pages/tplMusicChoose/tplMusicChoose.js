const app = getApp();
const util = require('../../utils/util.js');
/*
* todo 播放音乐
* */
Page({
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
        // px
        tabOffsetTop: 90
    },

    onLoad: function () {

        this.genMusic();
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
    genMusic(){
        const music = [];
        const arr = new Array(20).fill(0);
        util.each(arr, (k, v)=> {
            music.push({
                no:k,
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
});
