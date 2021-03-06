<?php
/**
 * Created by PhpStorm.
 * User: sunbelife
 * Date: 2018/12/5
 * Time: 10:52 PM
 */

namespace app\web\controller;
use app\web\model\MarryMan;
use app\web\model\MarryModel;
use think\Controller;
use app\web\model\Barrage;
use app\web\model\Music;
use app\web\model\Admin;

class Manage extends Controller
{
    public function index()
    {
        return "管理界面接口";
    }

    public function return_json($code, $msg, $data)
    {
        return json(array('code' => $code, 'msg' => $msg, 'data' => $data));
    }

    # 验证用户
    public function verify_user($user_name, $pass_word)
    {
        $result = Admin::getByUser_name($user_name);
        if ($result -> pass_word == $pass_word)
        {
            return $this::return_json(200, "验证成功", "null");
        } else
        {
            return $this::return_json(250, "验证失败", "null");
        }
    }

    # Music 音乐部分
    public function get_music_list($music_type = 0)
    {
        if ($music_type == 0) {
            $data = Music::all();
        } else {
            $data = Music::where('music_type', $music_type)->select();
        }
        return $this::return_json(200, "获取成功", $data);
    }

    # 音乐上传
    public function upload_music($music_name = 0, $music_type = 0)
    {
        $upload_dir = '../public/uploads/music';
        // 获取表单上传文件
        $file = request()->file('music');
        // 移动到目录下
        $info = $file->move($upload_dir);
        if ($info)
        {
            $upload_time = Date("Y-m-d H:i:s",time());
            $file_url = $_SERVER['HTTP_HOST'].str_replace("../public", '', $upload_dir).'/'.$info->getSaveName();
            // 成功上传后保存到数据库
            $new_music = new Music;
            $new_music->save([
                'music_name' => $music_name,
                'music_type' => $music_type,
                'music_upload_time' => $upload_time,
                'music_url' => $file_url
            ]);
            return $this::return_json(200, "上传成功", $info->getSaveName());
        } else
        {
            // 上传失败获取错误信息
            return $this::return_json(250, "上传失败".$file->getError(), null);
        }
    }

    public function del_music($music_id)
    {
        $data = Music::getByMusic_id($music_id);
        $result = $data->delete();
        if ($result == true) {
            return $this::return_json(200, "删除成功", "null");
        }
        return $this::return_json(250, "删除失败", "null");
    }

    # 赴宴信息管理部分
    public function get_attend_info_marry_man()
    {
        $data = MarryMan::all();
        return $this::return_json(200, "获取成功", $data);
    }

    public function get_attend_info_attend_man($card_id)
    {
        $data = MarryMan::where('card_id', $card_id)->select();
        return $this::return_json(200, "获取成功", $data);
    }

    # 模板管理部分

    public function get_model_list($model_type = 0)
    {
        if ($model_type == 0) {
            $data = MarryModel::all();
        } else {
            $data = MarryModel::where('model_type', $model_type)->select();
        }
        return $this::return_json(200, "获取成功", $data);
    }

    public function del_model($model_id)
    {
        $data = MarryModel::getByModel_id($model_id);
        $result = $data->delete();
        if ($result == true) {
            return $this::return_json(200, "获取成功", $data);
        }
        return $this::return_json(250, "获取成功", $data);
    }
}