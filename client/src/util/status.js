import util from '@/util/util'

let musicType = {
    1: '中文',
    2: '英文'
};


let transitTypeArr = [
    {
        id: 1,
        name: '自驾'
    },
    {
        id: 2,
        name: '公交'
    },
    {
        id: 3,
        name: '打车'
    },
    {
        id: 4,
        name: '步行'
    },
    {
        id: 5,
        name: '其他'
    }
];


let transitType = util.arrToObj(transitTypeArr, "id");

export default {
    musicType,
    transitType,

}
