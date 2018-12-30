const app = getApp();
const util = require('../../../utils/util.js');
const tplConfig = require('../../../utils/tplConfig.js');
// 写评论
const api = require('../../../utils/api.js');
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
                width: 381,
                height: 631,
                bottom: 36,
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
                bottom: 36,
                right: 26,
            }, editInfo));


            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            console.log(editInfo);
            return editInfo;
        }
    }

});