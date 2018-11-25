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
        invitationInfo: null, // 简化的定义方式
        showBanquetInfoBtn: null, // 简化的定义方式
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
        showBanquetInfo(e){
            this.triggerEvent('showBanquetInfo');
        },
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
                type: "image",
                index: editInfo.image.length,
                top: "25vh",
                left: "50vw"
            });

            // editInfo.image.push({
            //     type: "image",
            //     index: editInfo.image.length,
            //     bottom: "25vh",
            //     right: "25vw"
            // });

            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            console.log(editInfo);
            return editInfo;
        }
    }

});