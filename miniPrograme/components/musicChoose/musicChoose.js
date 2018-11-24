const util = require('../../utils/util.js');
// 写评论
const api = require('../../utils/api.js');
const tplConfig = require('../../utils/tplConfig.js');

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
        mp3Ref: "",
        titleHeight: 90,
        // changeTime: 300,
        // px
        tabOffsetTop: 90 + 90
    },
    ready(){
        console.log("musicChoose",tplConfig.mp3);
        // this.genMusic();

        this.setData({
            music: tplConfig.mp3
        });
    },
    methods: {
        hidePage(){
            this.destroyMusic();
            this.triggerEvent('hidePage');
        },
        chooseType: function (e) {
            const type = util.data(e, "type");
            this.setData({
                activeType: type
            });
        },
        destroyMusic(){
            // 销毁上一个
            if(this.data.mp3Ref){
                this.data.mp3Ref.destroy();
            }
        },
        chooseMusic: function (e) {
            const no = util.data(e, "no");
            const audioUrl = util.data(e, "audioUrl");
            this.destroyMusic();

            const innerAudioContext = wx.createInnerAudioContext();
            // 需要加载中吗？
            // wx.showLoading({
            //     title: '加载中'
            // });

            innerAudioContext.src = audioUrl;
            innerAudioContext.onPlay(() => {
                console.log('开始播放')
            });
            innerAudioContext.onCanplay(() => {
                // wx.hideLoading();
            });
            innerAudioContext.onError((res) => {
                console.log('播放错误')
                console.log(res.errMsg);
                console.log(res.errCode)
            });
            innerAudioContext.play();

            this.setData({
                mp3Ref:innerAudioContext,
                chooseMusic: no,
            });
        },
        saveSet(){
            this.triggerEvent('setMusic',{
                chooseMusic:this.data.chooseMusic
            });
            this.destroyMusic();

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