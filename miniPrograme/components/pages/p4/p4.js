

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
        animatedStep: new Array(1).fill(false)
    },
    ready(){

        // 后缀可能不一样，拷贝吧
        this.setData({
            // 需要写的页面
            img_write_1: `${this.data.imgPath}/tpl_${this.properties.tplName}/p${this.properties.pageName}_1.png`,
        });

        if (this.properties.hasBg) {
            this.setData({
                img_bg: `${this.data.imgPath}/tpl_${this.properties.tplName}/bg_p4.jpg`,
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
                width: 640,
                height: 914,
                top: 231,
                left: 54,
            }, editInfo));

            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            // console.log(editInfo);
            return editInfo;
        }
    }

});