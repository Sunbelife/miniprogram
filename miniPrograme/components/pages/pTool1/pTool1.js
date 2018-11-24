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
        item: null // 简化的定义方式
    },
    data: {
        page: tplConfig.pagesArrOb["tool1"],
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
            const arr = [];

            arr.push({
                type: "image",
                top: "25vh",
                left: "25vw"
            });
            arr.push({
                type: "image",
                bottom: "25vh",
                right: "25vw"
            });
            util.posCssComplete(arr);

            return arr;
        }
    }

});