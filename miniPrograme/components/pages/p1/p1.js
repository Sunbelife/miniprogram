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
        invitationInfo: null, // 简化的定义方式
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
                width: getApp().systemInfo.windowWidth,
                height: getApp().systemInfo.windowHeight,

                type: "image",
                index: editInfo.image.length,
                top: "50vh",
                left: "375rpx"
            });

            editInfo.text.push({
                type: "text",
                text: this.data.page.textSrc[0],
                index: editInfo.text.length,
                bottom: "350rpx",
                left: "175rpx"
            });

            util.posCssComplete(editInfo.image);
            util.posCssComplete(editInfo.text);

            console.log(editInfo);
            return editInfo;
        }
    }

});