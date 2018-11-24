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
const mp3 = [];

for (let i = 0; i < mp3AudioUrl.length; i++) {
    let index = i + 1;
    mp3.push({
        no: index,
        name: "音乐"+index,
        audioUrl: mp3AudioUrl[i]
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
    const pages = pagesArr.slice(7 * i, 7 * (i + 1));
    pages.forEach((v, k)=> {
        v.imgSrc = "https://dummyimage.com/200x300/" + colors[i] + "/ffffff&text=" + encodeURI("page" + (k + 1));
        v.imageSrc = [
            "https://dummyimage.com/200x300/" + colors[i] + "/ffffff&text=" + encodeURI("page" + (k + 1) + "_1"),
            "https://dummyimage.com/200x300/" + colors[i] + "/ffffff&text=" + encodeURI("page" + (k + 1) + "_2")
        ];
    });
    tpls.push({
        id: index,
        bgMusic: mp3[0],
        name: "tpl" + index,
        zh: "模板" + index,
        // 主色调
        mainColor: colors[i],
        imgSrc: "https://dummyimage.com/200x300/" + colors[i] + "/ffffff&text=模板" + index,
        pages: pages
    });
}


const tplsOb = util.arrToObj(tpls, "id");
const pagesArrOb = util.arrToObj(pagesArr, "id");
const mp3Ob = util.arrToObj(mp3, "no");

console.log(tplsOb,
    tpls,
    pagesArr,
    pagesArrOb);

module.exports = {
    tplsOb,
    tpls,
    mp3,
    mp3Ob,
    pagesArr,
    pagesArrOb

};
