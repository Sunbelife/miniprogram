const util = require('../../utils/util.js');
const api = require('../../utils/api.js');
const app = getApp();


Component({
    properties: {
        pages: null,
        item: null,
        bgMusic: null,
        invitationInfo: null,
        showBanquetInfoBtn: null,
        needMake: null,
    },
    data: {
        touchStart: 0,
        touchEnd: 0,
        isPlay: false,
        playRef: {},
        page: 0,
        pageTranslateY: 0
    },
    ready(){
        console.log("ready");


        // 显示第一个页面
        this.movePage(0);


        this.playInit();
        if (app.globalData.isAutoPlayMusic) {
            this.playStart();
        }

        if (util.isDev()) {
            // 开发指定到页面 0 开始的
            this.movePage(6);
        }

        this.needMakeHandle();
    },
    methods: {
        needMakeHandle(){
            // 需要制作，多加一个页面
            if (this.properties.needMake) {
                this.properties.pages.push({
                    id: "make",
                });
                // 定位过去
                this.setData({
                    pages: this.properties.pages
                });
            }
        },
        // 切换音乐
        changMusic(){
            this.playInit();
            this.playStart();
        },
        playInit(){

            const innerAudioContext = wx.createInnerAudioContext();
            innerAudioContext.src = this.properties.bgMusic["audioUrl"];
            // 循环播放
            innerAudioContext.loop = true;
            // innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
            innerAudioContext.onPlay(() => {
                console.log('开始播放')
            });
            innerAudioContext.onError((res) => {
                console.log('播放错误')
                console.log(res.errMsg);
                console.log(res.errCode)
            });
            // innerAudioContext.play();

            this.setData({
                playRef: innerAudioContext
            });

        },
        showBanquetInfo(){
            this.triggerEvent('showBanquetInfo');

        },
        movePage(page){

            // 隐藏
            util.each(this.properties.pages, (k, v)=> {
                // console.log(this.properties.pages, k);
                // console.log("#p" + (k), this.selectComponent("#p" + (k)));
                this.selectComponent("#p" + (k)).hide();
            });

            // 定位过去
            this.setData({
                page: page,
                pageTranslateY: -((page) * 100)
            });
            const curOb = this.selectComponent("#p" + page);
            // 显示
            curOb.show();
            // console.log("#p" + page);

            if (curOb.editInfo) {
                this.triggerEvent('pageMove', {
                    editInfo: curOb.editInfo(),
                    index: page
                });
            } else {
                this.triggerEvent('pageMove', {
                    editInfo: "",
                    index: page
                });
            }

        },

        touchStart(e){
            this.setData({
                touchStart: e.touches[0].clientY
            });
            // console.log(this.data.touchStart);
        },
        touchMove(e){
            // console.log("touchMove", e.touches);
            this.setData({
                // touchEnd: e.touches[0].pageY
                touchEnd: e.touches[0].clientY
            });


        },
        touchEnd(e){
            let page = this.data.page;

            // console.log("touchEnd", Math.abs(Math.abs(this.data.touchEnd) - Math.abs(this.data.touchStart)));
            // 不是有效滑动
            if (this.data.touchStart === 0 || this.data.touchEnd === 0) {
                return;
            }

            // 不是有效滑动
            if (Math.abs(Math.abs(this.data.touchEnd) - Math.abs(this.data.touchStart)) < 20) {
                return;
            }

            console.log(e);

            let oriPage = page;
            // console.log(this.data.touchEnd, this.data.touchStart);
            if (this.data.touchEnd < this.data.touchStart) {
                page++;
            } else {
                page--;
            }
            // console.log(page);
            // 边界处理 是否允许滑动
            if (page < 0) {
                page = 0;
            }
            const max = this.properties.pages.length - 1;
            if (page > max) {
                page = max;
            }

            // 不等于才移动
            if (oriPage !== page) {
                // 移动后置空
                this.setData({
                    touchStart: 0,
                    touchEnd: 0
                });

                this.movePage(page);
            }

        },

        togglePlay(){
            if (!this.data.isPlay) {
                this.playStart();
            } else {
                this.playStop();
            }
        },
        playStop(){
            this.data.playRef && this.data.playRef.pause();
            this.setData({
                isPlay: false
            });
        },
        playStart(){
            console.log(this.properties.bgMusic);
            this.data.playRef && this.data.playRef.play();
            this.setData({
                isPlay: true
            });
        },
        pageClick(){
            this.triggerEvent('pageClick');
        }
    }

});