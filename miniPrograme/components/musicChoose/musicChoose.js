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
        bgMusic: null, // 简化的定义方式
        item: null // 简化的定义方式
    },
    data: {
        chooseMusic: '',
        activeType: 0,
        type: [
            {
                name: "全部",
                number: 0
            },
            {
                name: "中文",
                number: 1
            },
            {
                name: "外文",
                number: 2
            }
        ],
        music: [],
        musicOb: {},
        // 需要顶部固定吗？
        scrollTopPage: 0,
        isNeedFixed: false,
        mp3Ref: "",
        titleHeight: 90,
        // changeTime: 300,
        // px
        tabOffsetTop: 90 + 90
    },
    ready() {
        // console.log("musicChoose", tplConfig.mp3);
        // this.genMusic();

        this.mp3List();


        if (util.isDev()) {
            this.setData({
                music: tplConfig.mp3
            });
        }
        
        // console.log(this.properties.bgMusic);

        this.setData({
            chooseMusic: this.properties.bgMusic
        });

    },
    methods: {
        hidePage() {
            this.destroyMusic();
            wx.hideLoading();
            this.triggerEvent('hidePage');
        },
        chooseType: function (e) {
            const type = util.data(e, "type");
            this.setData({
                activeType: type
            });
        },
        destroyMusic() {
            // 销毁上一个
            if (this.data.mp3Ref) {
                this.data.mp3Ref.destroy();
            }
            wx.hideLoading();
        },
        mp3List: function () {

            const loginReq = {

                // scene:"id%3D123%26name%3D123"
            };

            api.mp3List({
                // method: "POST",
                data: loginReq,
                success: (resLogin) => {
                    // console.log(resLogin);

                    const music = [];

                    util.each(resLogin.data.data, (k, v) => {
                        // console.log(k, v);
                        let item = {};
                        item.name = v.music_name;

                        if (!v.music_url.startsWith("http")) {
                            v.music_url = 'https://' + v.music_url;
                        }


                        item.audioUrl = v.music_url;
                        item.no =  v.music_id;
                        item.type =  parseInt(v.music_type);

                        music.push(item);
                    });


                    this.setData({
                        music: music,
                        musicOb:util.arrToObj(music,'no')
                    });
                    if (util.isDev()) {
                        this.setData({
                            music: music.concat(music).concat(music).concat(music)
                        });
                    }

                }
            });

        },
        chooseMusic: function (e) {


            const no = util.data(e, "no");
            const audioUrl = util.data(e, "audioUrl");
            this.destroyMusic();
            // console.log(no, audioUrl)

            const innerAudioContext = wx.createInnerAudioContext();
            // 需要加载中吗？
            // wx.showLoading({
            //     title: '加载中'
            // });

            wx.showLoading({
                title: '加载中'
            });

            innerAudioContext.src = audioUrl;
            innerAudioContext.onPlay(() => {
                wx.hideLoading();
                // console.log('开始播放')
            });
            innerAudioContext.onCanplay(() => {
                // console.log('可以播放')
            });
            innerAudioContext.onError((res) => {
                wx.hideLoading();
                util.toast("播放错误");
                // console.log('播放错误');
                // console.log(res.errMsg);
                // console.log(res.errCode)
            });
            innerAudioContext.play();

            this.setData({
                mp3Ref: innerAudioContext,
                chooseMusic: this.data.musicOb[no],
            });
        },
        saveSet() {
            wx.hideLoading();
            this.triggerEvent('setMusic', {
                chooseMusic: this.data.chooseMusic
            });
            this.destroyMusic();

        },
        genMusic() {
            const music = [];
            const arr = new Array(20).fill(0);
            util.each(arr, (k, v) => {
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
        loadMore() {

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