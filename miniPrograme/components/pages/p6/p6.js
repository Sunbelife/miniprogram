const app = getApp();
const util = require('../../../utils/util.js');
// 写评论
const api = require('../../../utils/api.js');
const tplConfig = require('../../../utils/tplConfig.js');
/*
 *  self.triggerEvent('writeover');
 * */
Component({
    behaviors: [],
    properties: {
        page: null, // 简化的定义方式
        item: null // 简化的定义方式
    },
    data: {
        imgPath: getApp().globalData.imgPre,
        animatedStep0: false,
        animatedStep1: false,
    },
    ready(){

    },
    methods: {
        show(){
            util.setTimeOutFlag(this, 2, 0);
        },
        hide(){
            util.setTimeOutFlagHide(this, 2);
        },
        editInfo(){

            const editInfo = {
                image: [],
                text: []
            };

            editInfo.image.push(util.genImg({
                width: 587,
                height: 912,
                top: 32,
                left: 34,
            }, editInfo));

            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            console.log(editInfo);
            return editInfo;
        }
    }

});