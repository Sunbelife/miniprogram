

const app = getApp();
const util = require('../../../utils/util.js');
const tplConfig = require('../../../utils/tplConfig.js');

Component({
    behaviors: [],
    properties: {
        bg: null, // 简化的定义方式
        page: null, // 简化的定义方式
        hasBg: null, // 简化的定义方式
        tplName: null, // 简化的定义方式
        pageName: null, // 简化的定义方式
    },
    data: {

        imgPath: getApp().globalData.imgPre,
        animatedStep: new Array(4).fill(false)
    },
    ready(){

        // 后缀可能不一样，拷贝吧
        this.setData({
            // 需要写的页面
            img_write_1: `${this.data.imgPath}/tpl_${this.properties.tplName}/p${this.properties.pageName}_1.png`,
        });

        if (this.properties.hasBg) {
            this.setData({
                img_bg: `${this.data.imgPath}/tpl_${this.properties.tplName}/bg_p5.jpg`,
            });
        }

        if(this.properties.bg){
            this.setData({
                img_bg: `${this.data.imgPath}/tpl_${this.properties.tplName}/${this.properties.bg}.jpg`,
            });
        }
    },
    methods: {
        imageLoad() {
            console.log("image load ");
            this.triggerEvent('imageLoad');
        },
        show() {
            util.setTimeOutFlagNew(this);
        },
        hide() {
            util.setTimeOutFlagHideNew(this);
        },
        editInfo(){

            const editInfo = {
                image: [],
                text: []
            };

            editInfo.image.push(util.genImg({
                width: 381,
                height: 631,
                top: 533,
                left: 26,
            }, editInfo));


            editInfo.image.push(util.genImg({
                width: 515,
                height: 421,
                top: 49,
                right: 26,
            }, editInfo));


            editInfo.image.push(util.genImg({
                width: 295,
                height: 325,
                top: 494,
                right: 26,
            }, editInfo));


            editInfo.image.push(util.genImg({
                width: 295,
                height: 325,
                top: 839,
                right: 26,
            }, editInfo));


            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            console.log(editInfo);
            return editInfo;
        }
    }

});