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
        imgSrc:"/images/logo.jpeg",
        // 默认缩放一半
        // scale: .5,
        scale: 1,
    },
    ready(){
    },
    methods: {
        hidePage(){
            this.triggerEvent('hidePage');
        },
        saveImage(){
            // this.hidePage();

            console.log(this.data.x,this.data.y,this.data.scale);
            
            console.log(this.properties.cutImageInfo);

            this.triggerEvent('saveImage',{
                curShowPage:this.properties.curShowPage,
                cutImageInfo:this.properties.cutImageInfo,
                newImageSrc: "https://dummyimage.com/200x300&text=random" + Math.floor(Math.random() * 1000)
            });

            // this.hidePage();
        },
        drawImg(){
            const that = this;

            wx.getImageInfo({
                src: this.data.imgSrc,
                success: function (res) {
                    console.log(res);

                    that.setData({
                        movableViewRectangle: {
                            width:res.width,
                            height:res.height
                        }
                    });
                    that.setData({
                        imgPath: res.path
                    });

                    setTimeout(()=> {
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
            console.log(e.detail);
            this.setData({
                x:e.detail.x,
                y:e.detail.y
            });
        },
        onScale(e) {
            console.log(e.detail);
            this.setData({
                scale:e.detail.scale,
                x:e.detail.x,
                y:e.detail.y
            });
        }
    }

});