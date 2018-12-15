<?php
/**
 * Created by PhpStorm.
 * User: sunbelife
 * Date: 2018/12/8
 * Time: 1:24 PM
 */

namespace app\wx\controller;

use myClass\MyImage;
use think\Controller;
use app\wx\model\Settings;
use app\wx\model\UserCard;
use app\wx\model\Barrage;
use app\wx\model\User;
use app\wx\model\Photo;
use app\web\model\MarryMan;
use app\wx\model\AttendInfo;
use app\wx\controller\CryptWxData\WXBizDataCrypt;

Class Api extends Controller
{
    static $app_id = "wxca7cf8f75db95d01";
    static $secret = "8a6f49abe8b74560f87b9ecf8002c983";

    public function index()
    {
        return $this->fetch();
    }

    public function return_json($code, $msg, $data)
    {
        return json(array('code' => $code, 'msg' => $msg, 'data' => $data));
    }

    public function return_value($data, $key)
    {
        return isset($data->$key)? $data->$key : null;
    }

    public function return_card_id($id)
    {
        return md5(Date("Y-m-d").$id);
    }

    # 验证用户部分
    public function verify_user($code)
    {
        $login_time = Date("Y-m-d H:i:s",time());
        $api_url = "https://api.weixin.qq.com/sns/jscode2session?appid=".$this::$app_id."&secret=".$this::$secret."&js_code=".$code."&grant_type=authorization_code";
        $data =  json_decode(file_get_contents($api_url));
        $errcode = $this::return_value($data, "errcode");
        $errmsg = $this::return_value($data, "errmsg");

        if ($errcode == 0) {
            # 准备数据
            $session_key = $this::return_value($data, "session_key");
            $open_id = $this::return_value($data, "openid");
            $data = array('open_id' => $open_id);
            $old_user = User::getByOpenId($open_id);

            if ($old_user)
            {
                $old_user -> session_key = $session_key;
                $old_user->save();
            } else
            {
                # 存数据库
                $User = new User;
                $User->open_id = $open_id;
                $User->session_key = $session_key;
                $User->time = $login_time;
                $User->save();
            }

            return $this::return_json(200, "获取成功", $data);
        }
        return $this::return_json($errcode, $errmsg, null);
    }

    public function get_union_id($open_id, $iv, $encryptedData)
    {
        $app_id = $this::$app_id;
        $iv = urldecode($iv);
        $sessionKey = User::getByOpenId($open_id)->session_key;
        $pc = new WxBizDataCrypt($app_id, $sessionKey);
        $errCode = $pc->decryptData($encryptedData, $iv, $data);
        $data = json_decode($data);
        $union_id = $this::return_value($data, "unionId");
        $open_id = $this::return_value($data, "openId");
        if ($errCode == 0) {
            $data = User::getByOpenId($open_id);
            $data->union_id = $union_id;
            $data->save();
            return $this::return_json(200, "获取成功", null);
        }
        return $this::return_json($errCode, "错误码请参考文档", null);
    }


    # 请帖部分
    # 保存请帖 - 此处生成 card_id
    public function save_user_card($card_id = 0, $changed_log, $cover_pic_url)
    {
        $save_time = Date("Y-m-d H:i:s",time());
        if ($card_id == 0)
        {
            $UserCard = new UserCard;
            $UserCard->cover_pic_url = $cover_pic_url;
            $UserCard->changed_log = $changed_log;
            $UserCard->time = $save_time;
            $UserCard->save();
            # 生成 card_id
            $UserCard->card_id = $this::return_card_id($UserCard->id);
            $result = $UserCard->save();
            if ($result == True)
            {
                return $this::return_json(200, "创建成功", null);
            } else
            {
                return $this::return_json(250, "创建失败", null);
            }
        } else if ($card_id != 0)
        {
            $curr_card = UserCard::getByCardId($card_id);
            $curr_card->changed_log = $changed_log;
            $curr_card->time = $save_time;
            $result = $curr_card->save();
            if ($result == True)
            {
                return $this::return_json(200, "修改成功", null);
            } else
            {
                return $this::return_json(250, "修改失败", null);
            }
        }
    }

    # 照片裁切上传
    public function upload_pic($p_x = 0, $p_y = 0, $p_width, $p_height, $p_scale)
    {
        $upload_dir = '../public/uploads/photo/';

        // 获取表单上传文件
        $file = request()->file('image');
        $file_info = $file->getInfo();

        $my_image = MyImage::open($file);
        $result = $my_image->thumb($p_width * $p_scale, $p_height * $p_scale)->crop($p_width, $p_height, $p_x, $p_y)->save($upload_dir.$file_info['name']);

        if ($result)
        {
            $upload_time = Date("Y-m-d H:i:s",time());
            $file_url = $_SERVER['HTTP_HOST'].str_replace("../public", '', $upload_dir).$file_info['name'];
            // 成功上传后保存到数据库
            $new_photo = new Photo;
            $new_photo->save([
                'photo_url' => $file_url,
                'upload_time' => $upload_time
            ]);
            return $this::return_json(200, "上传成功", $file_url);
        } else
        {
            // 上传失败获取错误信息
            return $this::return_json(250, "上传失败", null);
        }
    }

    # Barrage 弹幕部分
    # 发送弹幕
    public function send_barrage_msg($user_name, $card_id, $msg_id = null, $message)
    {
        $Barriage = new Barrage;
        $send_time = Date("Y-m-d H:i:s",time());
        $msg_id = md5(Date("Y-m-d H:i:s"));
        $Barriage->card_id = $card_id;
        $Barriage->msg_id = $msg_id;
        $Barriage->user_name = $user_name;
        $Barriage->message = $message;
        $Barriage->time = $send_time;
        $Barriage->is_read = $msg_id != null ? 1 : 0; // msg 不空为回复消息，回复消息默认已读
        $Barriage->is_reply = 0;
        $result = $Barriage->save();
        if ($result == 1)
        {
            return $this::return_json(200, "发送成功", null);
        }
        return $this::return_json(250, "发送失败", null);
    }

    # 获取全部弹幕
    public function get_barrage_msg($card_id)
    {
        $data = Barrage::where('card_id', $card_id)->select();
        return $this::return_json(200, "获取成功", $data);
    }

    # 获取未读弹幕数量
    public function get_barrage_msg_is_read()
    {
        $data = Barrage::where('is_read', 0)->count();
        return $this->return_json(200, "获取成功", array('is_read_sum'=>$data));
    }

    # 弹幕设置已读
    public function set_barrage_msg_is_read($msg_id)
    {
        $data = Barrage::where('msg_id', $msg_id)->select();
        foreach ($data as $item)
        {
            $item->is_read = 1;
            $item->save();
        }
        if ($data == null)
        {
            return $this->return_json(250, "设置失败", null);
        } else
        {
            return $this->return_json(200, "设置成功", null);
        }
    }

    # 弹幕回复
    public function reply_barrage_msg($msg_id, $message)
    {
        $reply_time = Date("Y-m-d H:i:s",time());
        $old_msg = Barrage::getByMsgId($msg_id);
        $barrage = new Barrage;
        $result = $barrage -> save([
            'card_id'=>$old_msg->card_id,
            'user_name'=>"回复 @".$old_msg->user_name.":",
            'message'=>$message,
            'msg_id'=>$msg_id,
            'is_read'=>1,
            'is_reply'=>1,
            'time'=>$reply_time
        ]);
        if ($result == null)
        {
            return $this->return_json(250, "回复失败", null);
        } else
        {
            return $this->return_json(200, "回复成功", null);
        }
    }

    # 保存设置 - 暂时弃用
//    public function save_settings($card_id, $is_barrage_on, $music_id)
//    {
//        $settings = new Settings;
//        $settings->card_id = $card_id;
//        $settings->is_barrage_on = $is_barrage_on;
//        $settings->music_id = $music_id;
//        $result = $settings->save();
//        if ($result)
//        {
//            return $this::return_json(200, "保存成功", null);
//        }
//        return $this::return_json(250, "保存失败", null);
//    }

    # 赴宴信息部分
    # 赴宴填写
    public function send_attend_info($card_id, $user_name, $transit_type, $phone_num, $attend_num, $attend_time)
    {
        $attend_info = new AttendInfo;
        $result = $attend_info -> save([
            'card_id' => $card_id,
            'user_name' => $user_name,
            'transit_type' => $transit_type,
            'phone_num' => $phone_num,
            'attend_num' => $attend_num,
            'attend_time' => $attend_time
        ]);
        if ($result)
        {
            return $this->return_json(200, "发送成功", null);
        }
        else
        {
            return $this->return_json(250, "发送失败", null);
        }
    }

    # 赴宴消息获取
    public function get_attend_info($card_id)
    {
        $data = AttendInfo::getCardId($card_id);
        if ($data == null)
        {
            return $this->return_json(250, "获取失败", $data);
        } else
        {
            return $this->return_json(200, "获取成功", $data);
        }
    }

    # 保存用户结婚信息
    public function send_user_card_info($card_id, $boy_name, $girl_name, $marr_time, $contact_num, $marr_addr)
    {
        $create_time = Date("Y-m-d H:i:s",time());
        $marry_man = new MarryMan([
            'card_id'=>$card_id,
            'boy_name'=>$boy_name,
            'girl_name'=>$girl_name,
            'marr_time'=>$marr_time,
            'contact_num'=>$contact_num,
            'marr_addr'=>$marr_addr,
            'create_time'=>$create_time
        ]);
        $result = $marry_man->save();
        if ($result == null)
        {
            return $this->return_json(250, "保存失败", null);
        } else
        {
            return $this->return_json(200, "保存成功", null);
        }
    }

    # 生成二维码
    public function gen_user_card_qr($card_id = 0, $scene = 0, $page = 0)
    {
        $scene = "test";
        $page = "test";
        $access_token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$this::$app_id."&secret=".$this::$secret;
        $qr_model_pic = "static/pic/gen_qr_model.png";
        $data =  json_decode(file_get_contents($access_token_url));
        $errcode = $this::return_value($data, "errcode");
        $errmsg = $this::return_value($data, "errmsg");
        if ($errcode == 0) {
            $access_token = $this::return_value($data, "access_token");
            $qr_api_url = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=ACCESS_TOKEN";
            $parms = [
                'access_token' => $access_token,
                'scene' => $scene,
                'page' => $page
            ];
            $context = stream_context_create(array('http' => array(
                'method' => 'POST',
                'header' => 'Content-type:application/x-www-form-urlencoded',
                'content' => http_build_query($parms),
                'timeout' => 20
            )));
            $data = file_get_contents($qr_api_url, false, $context);
            $pic_model = imagecreatefrompng($qr_model_pic);

            return $data;
        } else {
            return $this->return_json($errcode, $errmsg, null);
        }
    }
}