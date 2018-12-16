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

            editInfo.image.push({
                width: util.rpx2px(225),
                height:  util.rpx2px(362),

                type: "image",
                index: editInfo.image.length,
                top: "25vh",
                left: "25vw"
            });

            editInfo.image.push({
                width: util.rpx2px(225),
                height:  util.rpx2px(362),

                type: "image",
                index: editInfo.image.length,
                bottom: "25vh",
                right: "25vw"
            });

            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            console.log(editInfo);
            return editInfo;
        }
    }

});