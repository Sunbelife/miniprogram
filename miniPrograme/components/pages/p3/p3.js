

const app = getApp();
const util = require('../../../utils/util.js');
const tplConfig = require('../../../utils/tplConfig.js');

Component({
    behaviors: [],
    properties: {
        bg: null, // 简化的定义方式
        hasBg: null, // 简化的定义方式
        page: null, // 简化的定义方式
        tplName: null, // 简化的定义方式
        pageName: null, // 简化的定义方式
    },
    data: {
        imgPath: getApp().globalData.imgPre,
        animatedStep: new Array(2).fill(false)
    },
    ready(){

        // 后缀可能不一样，拷贝吧
        this.setData({
            // 需要写的页面
            img_write_1: `${this.data.imgPath}/tpl_${this.properties.tplName}/p${this.properties.pageName}_1.png`,
        });
        if (this.properties.hasBg) {
            this.setData({
                img_bg: `${this.data.imgPath}/tpl_${this.properties.tplName}/bg_p3.jpg`,
            });
        }

        if(this.properties.bg){
            this.setData({
                img_bg: `${this.data.imgPath}/tpl_${this.properties.tplName}/${this.properties.bg}.jpg`,
            });
        }
    },
    methods: {
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
                width: 634,
                height: 443,
                top: 235,
                left: 58,
            }, editInfo));

            editInfo.image.push(util.genImg({
                width: 634,
                height: 443,
                top: 696,
                left: 58,
            }, editInfo));

            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            return editInfo;
        }
    }

});