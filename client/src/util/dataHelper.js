import util from '@/util/util'
import status from '@/util/status'

function musicList(data) {
    const newObArr = [];
    util.each(data, function (k, v) {
        const newOb = {};
        newOb.id = v.music_id;
        newOb.name = v.music_name;
        newOb.time = v.music_upload_time;
        newOb.src = v.music_url;
        newOb.type = status.musicType[v.music_type];
        newObArr.push(newOb);
    });

    return newObArr;
}

function marryInfo(data) {
    const newObArr = [];
    util.each(data, function (k, v) {
        const newOb = {};
        newOb.id = v.id;
        newOb.man = v.boy_name;
        newOb.women = v.girl_name;
        newOb.card_id = v.card_id;
        newOb.create_time = v.create_time;
        newOb.marr_time = v.marr_time;
        newOb.marr_addr = v.marr_addr;
        newOb.contact_num = v.contact_num;
        newObArr.push(newOb);
    });

    return newObArr;
}

function banquetInfo(data) {
    const newObArr = [];
    util.each(data, function (k, v) {
        const newOb = {};
        newOb.id = v.id;

        newOb.transit_type = status.transitType[v.transit_type];

        newOb.user_name = v.user_name;
        newOb.phone_num = v.phone_num;
        newOb.attend_num = v.attend_num;
        newOb.attend_time = v.attend_time;


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
