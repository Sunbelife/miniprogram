const util = require('./util.js');


const pagesArr = [];

for (let i = 0; i < 70; i++) {
    let index = i + 1;

    addPage(index);
}


const mp3AudioUrl = [
    'http://zhangmenshiting.qianqian.com/data2/music/eee8aee9c2309f7e316bff0e0d35243d/594545500/594545500.mp3?xcode=2a8925a8cca85ccc6a37d80a2c02fc5b',
    'http://zhangmenshiting.qianqian.com/data2/music/71aab1f7eca22ddcb6864350a9b7e937/594519872/594519872.mp3?xcode=8d70b4479bc8bccfd7984b79751f9d39',
    'http://zhangmenshiting.qianqian.com/data2/music/86a1b394e742a3c0a25e0601eb866aa0/594519833/594519833.mp3?xcode=8d70b4479bc8bccfd7984b79751f9d39',
    'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
];
const mp3Rel = [{
    music_id: 13,
    music_name: "追光者",
    music_type: "1",
    music_upload_time: "2018-12-22",
    music_url: "https://xcx.lyy99.com/uploads/music/20181222/982b554eea62638a43f143dbc48d8fde.mp3",
}];
const mp3 = [];

// for (let i = 0; i < mp3AudioUrl.length; i++) {
//     let index = i + 1;
//     mp3.push({
//         no: index,
//         name: "音乐" + index,
//         audioUrl: mp3AudioUrl[i]
//     });
// }

// TODO ，先写固定~~
for (let i = 0; i < mp3Rel.length; i++) {
    let cur = mp3Rel[i];
    mp3.push({
        no: cur.music_id,
        name: cur.music_name,
        audioUrl: cur.music_url
    });
}


function addPage(name) {
    pagesArr.push({
        id: name,
        zh: "页面" + name,
        name: "page" + name,
        imageSrc: [
            "https://dummyimage.com/200x300&text=" + encodeURI("page" + name + "_1"),
            "https://dummyimage.com/200x300&text=" + encodeURI("page" + name + "_2")
        ],
        textSrc: [
            "嘻嘻嘻嘻嘻",
            "嘻嘻嘻嘻嘻"
        ],
        // 模板和页面是有封面的！
        imgSrc: "https://dummyimage.com/200x300&text=" + encodeURI("page" + name)
    });
}

// 添加工具页面1
addPage("tool1");


const colors = [
    "19CAAD",
    "8CC7B5",
    "A0EEE1",
    "BEE7E9",
    "BEEDC7",
    "D6D5B7",
    "D1BA74",
    "E6CEAC",
    "ECAD9E",
    "F4606C"

];

const tpls = [];

for (let i = 0; i < 10; i++) {
    let index = i + 1;

    // TODO  70个模板
    // const pages = pagesArr.slice(7 * i, 7 * (i + 1));
    // 把剩下的 9个模板 先替换成第一个模板的页面
    let pages = [];
    util.extend(true, pages, pagesArr.slice(0, 7));


    // // console.log("GenPages", pages);
    pages.forEach((v, k) => {
        v.imgSrc = "https://dummyimage.com/200x300/" + colors[i] + "/ffffff&text=" + encodeURI("page" + (k + 1));
        v.imageSrc = [
            "https://dummyimage.com/200x300/" + colors[i] + "/ffffff&text=" + encodeURI("page" + (k + 1) + "_1"),
            "https://dummyimage.com/200x300/" + colors[i] + "/ffffff&text=" + encodeURI("page" + (k + 1) + "_2")
        ];
    });

    // 致宾客页面单独处理
    const toGuestsPage = {};
    util.extend(true, toGuestsPage, pages[pages.length - 1]);
    toGuestsPage.type = "toGuests";
    // 致宾客页面单独处理
    const pagesCommon = [];
    util.extend(true, pagesCommon, pages.slice(0, 6));

    tpls.push({
        id: index,
        bgMusic: mp3[0],
        name: "tpl" + index,
        zh: "模板" + index,
        // 主色调
        mainColor: colors[i],
        imgSrc: "https://dummyimage.com/200x300/" + colors[i] + "/ffffff&text=模板" + index,
        pages: pagesCommon,
        shareImg: '',
        // 有弹幕吗
        barrageHas: true,
        // 有致宾客页面吗
        toGuestsHas: true,
        toGuestsPage: toGuestsPage,
        invitationInfo: {
            address: "",
            date: util.getCurDate(),
            time: '12:00',
            // 默认地址是大望路
            latitude: 0,
            longitude: 0,
            nameLady: "",
            nameGentleman: ""
        }
    });
}


const tplsOb = util.arrToObj(tpls, "id");
const pagesArrOb = util.arrToObj(pagesArr, "id");
const mp3Ob = util.arrToObj(mp3, "no");

// console.log(tplsOb,tpls,pagesArr,pagesArrOb);


const mockTpl = {
    // 有弹幕吗
    barrageHas: true,
    id: 1,
    // 有致宾客页面吗
    shareImg: '',
    toGuestsHas: true,
    toGuestsPage: {
        "id": 7,
        "zh": "致宾客页",
        "name": "page7",
        "type": "toGuests",
        "imageSrc": ["https://dummyimage.com/200x300/19CAAD/ffffff&text=page7_1", "https://dummyimage.com/200x300/19CAAD/ffffff&text=page7_2"],
        "textSrc": ["嘻嘻嘻嘻嘻", "嘻嘻嘻嘻嘻"],
        "imgSrc": "https://dummyimage.com/200x300/19CAAD/ffffff&text=page7",
        "canRemove": 0
    },
    "pages": [{
        "id": 1,
        "zh": "封面",
        "name": "page1",
        "imageSrc": ["https://dummyimage.com/200x300/19CAAD/ffffff&text=page1_1", "https://dummyimage.com/200x300/19CAAD/ffffff&text=page1_2"],
        "textSrc": ["嘻嘻嘻嘻嘻", "嘻嘻嘻嘻嘻"],
        "imgSrc": "https://dummyimage.com/200x300/19CAAD/ffffff&text=page1",
        "canRemove": 0
    }, {
        "id": 2,
        "zh": "页面一",
        "name": "page2",
        "imageSrc": ["https://dummyimage.com/200x300/19CAAD/ffffff&text=page2_1", "https://dummyimage.com/200x300/19CAAD/ffffff&text=page2_2"],
        "textSrc": ["嘻嘻嘻嘻嘻", "嘻嘻嘻嘻嘻"],
        "imgSrc": "https://dummyimage.com/200x300/19CAAD/ffffff&text=page2",
        "canRemove": 1
    }, {
        "id": 3,
        "zh": "页面二",
        "name": "page3",
        "imageSrc": ["https://dummyimage.com/200x300/19CAAD/ffffff&text=page3_1", "https://dummyimage.com/200x300/19CAAD/ffffff&text=page3_2"],
        "textSrc": ["嘻嘻嘻嘻嘻", "嘻嘻嘻嘻嘻"],
        "imgSrc": "https://dummyimage.com/200x300/19CAAD/ffffff&text=page3",
        "canRemove": 1
    }, {
        "id": 4,
        "zh": "页面三",
        "name": "page4",
        "imageSrc": ["https://dummyimage.com/200x300/19CAAD/ffffff&text=page4_1", "https://dummyimage.com/200x300/19CAAD/ffffff&text=page4_2"],
        "textSrc": ["嘻嘻嘻嘻嘻", "嘻嘻嘻嘻嘻"],
        "imgSrc": "https://dummyimage.com/200x300/19CAAD/ffffff&text=page4",
        "canRemove": 1
    }, {
        "id": 5,
        "zh": "页面四",
        "name": "page5",
        "imageSrc": ["https://dummyimage.com/200x300/19CAAD/ffffff&text=page5_1", "https://dummyimage.com/200x300/19CAAD/ffffff&text=page5_2"],
        "textSrc": ["嘻嘻嘻嘻嘻", "嘻嘻嘻嘻嘻"],
        "imgSrc": "https://dummyimage.com/200x300/19CAAD/ffffff&text=page5",
        "canRemove": 1
    }, {
        "id": 6,
        "zh": "页面五",
        "name": "page6",
        "imageSrc": ["https://dummyimage.com/200x300/19CAAD/ffffff&text=page6_1", "https://dummyimage.com/200x300/19CAAD/ffffff&text=page6_2"],
        "textSrc": ["嘻嘻嘻嘻嘻", "嘻嘻嘻嘻嘻"],
        "imgSrc": "https://dummyimage.com/200x300/19CAAD/ffffff&text=page6",
        "canRemove": 1
    }],
    "bgMusic":  mp3[0],
    "invitationInfo": {
        "address": "婚礼地址",
        "date": "2018-11-25",
        "time": "12:00",
        "latitude": 39.90824,
        "longitude": 116.47783,
        "nameLady": "新娘-lily",
        "nameGentleman": "新郎-bob"
    }
};

module.exports = {
    tplsOb,
    tpls,
    mp3,
    mockTpl,
    mp3Ob,
    pagesArr,
    pagesArrOb

};
