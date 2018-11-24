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
        text: "曾经我们在同一个学校学习，而今我们在同一个城市打拼。我们相互扶持，谱写我们美好的明天！或许你还有些许担心，",
        animatedStep0: false,
        animatedStep1: false,
        animatedStep2: false
    },
    ready(){
        console.log(tplConfig.pagesArrOb);
        console.log(tplConfig.pagesArrOb["1"]);
        console.log(this.properties.page);
    },
    methods: {
        show(){
            console.log("show");
            util.setTimeOutFlag(this, 3, 0);
        },
        hide(){
            console.log("hide");
            util.setTimeOutFlagHide(this, 3);
        },
        editInfo(){

            const editInfo = {
                image: [],
                text: []
            };


            editInfo.image.push({
                type: "image",
                index: editInfo.image.length,
                top: "50vh",
                left: "375rpx"
            });

            editInfo.text.push({
                type: "text",
                text: this.data.text,
                index: editInfo.text.length,
                bottom: "250rpx",
                left: "375rpx"
            });

            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            console.log(editInfo);
            return editInfo;
        }
    }

});