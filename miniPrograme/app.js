//app.js
App({
    isPublish: false,
    globalData: {
        // 当前开发的模板
        devTpl: 2,
        // 当前开发的页面
        devPage: 1,
        // 当前开发的图片进度
        devPageImgProcess: {
            tpl: 4,
            page: 7,
        },

        isAutoPlayMusic: true,
        // isAutoPlayMusic: false,
        domain: "https://xcx.lyy99.com",
        domainDev: "http://localhost:3000",

        // TODO 改回去
        // imgPre: "/images/all",
        imgPre:"https://xcx.lyy99.com/uploads/all",


        // TODO 改回去
        // isDev: 1,
        isDev: 0,

        // isMock: 1,
        isMock: 0,
        userInfo: null,
        name:{
            miniProgram:'「原野映像婚宴请帖」',
            serviceAccount:'「原野映像环球旅拍」',
        }
    },
    systemInfo: null,
    onLaunch: function () {

        if(!this.globalData.isDev){
            this.globalData.isMock = 0;
            this.globalData.isAutoPlayMusic = true;
        }

        const self = this;
        wx.getSystemInfo({
            success(res) {
                console.log("getSystemInfo",res);
                self.systemInfo = res;
                console.log(res);

            }
        });


        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        });
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    }
});