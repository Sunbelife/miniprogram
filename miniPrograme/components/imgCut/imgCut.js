const app = getApp();
const util = require('../../utils/util.js');
const api = require('../../utils/api.js');

Component({
    behaviors: [],
    properties: {
        cutImageInfo: null, // 简化的定义方式
        curShowPage: null, // 简化的定义方式
        item: null // 简化的定义方式
    },
    data: {
        movableAreaRectangle: {
            width: "300px",
            height: "300px",
        },
        movableViewRectangle: {
            width: "500px",
            height: "500px",
        },
        isLoading: false,
        x: 0,
        y: 0,
        imgSrc: "/images/logo.jpeg",
        // 默认缩放一半
        // 需要的图片大小和用户都要缩放
        scale: .5
        // scale: 1,
    },
    ready() {

        const cutImageInfo = this.properties.cutImageInfo;

        console.log(cutImageInfo);
        if (!cutImageInfo.width) {
            console.error("未设置编辑图片的大小");
        } else {
            this.setData({
                movableAreaRectangle: {
                    width: this.cssHandle(cutImageInfo.width, this.data.scale),
                    height: this.cssHandle(cutImageInfo.height, this.data.scale)
                }
            });
        }
    },
    methods: {
        cssHandle(css, scale) {
            //     css  300px   300 * scale  + px
            return (css.replace("px", "") * scale) + "px";
        },
        hidePage() {
            this.triggerEvent('hidePage');
        },
        saveImage() {
            // this.hidePage();

            console.log(this.data.x, this.data.y, this.data.scale);

            console.log(this.properties.cutImageInfo);

            this.triggerEvent('saveImage', {
                curShowPage: this.properties.curShowPage,
                cutImageInfo: this.properties.cutImageInfo,
                newImageSrc: "https://dummyimage.com/200x300&text=random" + Math.floor(Math.random() * 1000)
            });

            // this.hidePage();
        },
        drawImg() {
            const that = this;

            wx.getImageInfo({
                src: this.data.imgSrc,
                success: function (res) {
                    console.log(res);

                    that.setData({
                        movableViewRectangle: {
                            width: res.width,
                            height: res.height
                        }
                    });
                    that.setData({
                        imgPath: res.path
                    });

                    setTimeout(() => {
                        that.drawSharePic(res);
                    }, 300)
                },
                fail: function (res) {
                    //失败回调
                    console.log(res);
                }
            });
        },


        onChange(e) {
            // {x: 0, y: 0, source: "touch"}
            // console.log(e.detail);
            this.setData({
                x: e.detail.x,
                y: e.detail.y
            });
        },
        scaleRecord: {},
        onScale(e) {
            // {scale: 0.6, x: -18.3, y: -18.3}
            // console.log(e.detail);
            this.scaleRecord = {
                scale: e.detail.scale,
                x: e.detail.x,
                y: e.detail.y
            };
        }
    }

});