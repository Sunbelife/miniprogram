const app = getApp();
const util = require('../../utils/util.js');
const api = require('../../utils/api.js');

Page({
    data: {
        tplInfo: {},
        shareImg: 'https://dummyimage.com/200x300&text=hello',
    },

    onLoad: function () {

        this.loadTpl();
        this.save();
    },
    loadTpl() {
        try {
            var tplInfo = wx.getStorageSync('tplInfo');
            console.log(JSON.stringify(tplInfo));
            if (tplInfo) {
                util.tplALL.fixToGuestsHas(tplInfo);

                // Do something with return value
                this.setData({
                    isReady: true,
                    tplInfo: tplInfo
                });
            } else {
                if (util.isDev()) {
                    this.setData({
                        isReady: true,
                        tplInfo: tplConfig.mockTpl
                    });
                }
            }
        } catch (e) {
            // Do something when catch error
        }
    },

    save() {
        wx.showLoading({
            title: '正在保存',
        });

        const userOpenid = wx.getStorageSync('userOpenid');

        const loginReq = {
            open_id: userOpenid,
            changed_log: JSON.stringify(this.data.tplInfo),
            cover_pic_url: '',
        };

        // 存在才传  把 card_id 传上去，就是更新
        // 不传 就是新建
        const card_id = this.data.tplInfo.card_id;
        if (card_id) {
            loginReq.card_id = card_id;
        }

        api.tplSave({
            method: "POST",
            data: loginReq,
            success: (resLogin) => {
                console.log(resLogin);

                if (!card_id) {
                    this.data.tplInfo.card_id = resLogin.data.data.card_id;
                }
                util.tplALL.updateOne(this.data.tplInfo);

                wx.hideLoading();
            }
        });

    },
    share: function () {
        wx.showShareMenu({
            withShareTicket: true,
            success(e) {
                console.log(e);
            },
            fail(e) {
                console.log(e);
            },
            complete(e) {
                console.log(e);
            }
        })
    },
    addPic() {
        const self = this;
        wx.chooseImage({
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                self.setData({
                    shareImg: tempFilePaths
                });

                const req = {};
                req.url = "";
                req.path = tempFilePaths;
                req.name = "";
                req.success = function () {

                };
                req.fail = function () {

                };
                // TODO 上传照片
                // wx.wxUpload(req);
            }
        })
    },
    // 分享图片生成
    shareImgGen(shareImgUrl) {
        wx.showLoading({
            title: '正在生成图片...',
            mask: true
        });

        const that = this;
        wx.getImageInfo({
            src: shareImgUrl,
            success: function (res) {
                console.log(res);
                const path = res.path;

                that.shareImgGenSave(path);
            },
            fail: function (res) {
                wx.hideLoading();
                //失败回调
                console.log(res);
            }
        });
    },
    // 分享图片保存
    shareImgGenSave(path) {
        wx.saveImageToPhotosAlbum({
            filePath: path,
            success(res) {
                console.log(res);
                util.toast('保存成功');

            },
            fail(res) {
                console.log(res);
                util.toast('保存失败');
            },
            complete(res) {
                wx.hideLoading();
            }
        })
    },

    // 分享配置
    // TODO 分享配置
    onShareAppMessage: function (res) {

        console.log(res);
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        console.log({
            title: `${this.data.tplInfo.invitationInfo.nameGentleman}&${this.data.tplInfo.invitationInfo.nameLady}的婚礼邀请`,
            path: '/pages/tplUserLook/tplUserLook?id='+this.data.tplInfo.card_id
        });
        return {
            title: ` ${this.data.tplInfo.invitationInfo.nameGentleman}&${this.data.tplInfo.invitationInfo.nameLady}的婚礼邀请`,
            path: '/pages/tplUserLook/tplUserLook?id='+this.data.tplInfo.card_id
        }
    }
});
