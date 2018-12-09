import util from '@/util/util'
import status from '@/util/status'

function musicList(data) {
    const newObArr = [];
    util.each(data, function (k, v) {
        const newOb = {};
        newOb.id = v.music_id;
        newOb.name = v.music_name;
        newOb.time = v.music_time;
        newOb.type = status.musicType[v.music_type];
        newObArr.push(newOb);
    });

    return newObArr;
}

function marryInfo(data) {
    const newObArr = [];
    util.each(data, function (k, v) {
        const newOb = {};
        newOb.id = v.marry_id;
        newOb.man = v.marry_man;
        newOb.women = v.marry_women;
        newObArr.push(newOb);
    });

    return newObArr;
}

function banquetInfo(data) {
    const newObArr = [];
    util.each(data, function (k, v) {
        const newOb = {};
        newOb.id = v.marry_id;
        newOb.man = v.marry_man;
        newOb.women = v.marry_women;
        newObArr.push(newOb);
    });

    return newObArr;
}
function tplList(data) {
    const newObArr = [];
    util.each(data, function (k, v) {
        const newOb = {};
        newOb.id = v.model_id;
        newOb.name = v.model_name;
        newOb.type = v.model_type;
        newOb.cover = v.model_pic_url;
        if(util.isLocal){
            newOb.cover = "https://dummyimage.com/200x300&text=hello";
        }
        newOb.time = v.model_time;
        newObArr.push(newOb);
    });

    return newObArr;
}


export default {
    musicList,
    marryInfo,
    banquetInfo,
    tplList,
}