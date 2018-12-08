<?php
/**
 * Created by PhpStorm.
 * User: sunbelife
 * Date: 2018/12/8
 * Time: 1:24 PM
 */

namespace app\wx\controller;
use think\Controller;
use app\wx\model\Barrage;

Class Api extends Controller
{
    public function index()
    {
        return "Hello World!";
    }

    public function return_json($code, $msg, $data)
    {
        return json(array('code' => $code, 'msg' => $msg, 'data' => $data));
    }

    # Barrage 弹幕部分
    public function send_barrage_msg($user_name, $message, $card_id, $time)
    {
        $data = Barrage::getBybarr_id($card_id);
        # 尚未完成
        return 0;
    }

    # http://localhost/web/manage/get_barrage_msg/card_id/1/2
    public function get_barrage_msg($card_id = 0)
    {
        if ($card_id == 0) {
            return json(array('code' => 250, 'msg' => "获取失败", 'data' => "null"));
        }
        $data = Barrage::getBybarr_id($card_id);
        return json(array('code' => 200, 'msg' => "获取成功", 'data' => $data));
    }
}