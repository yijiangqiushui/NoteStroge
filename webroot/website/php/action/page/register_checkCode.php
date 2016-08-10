<?php
/**
 * Created by PhpStorm.
 * User: yijiangqiushui
 * Date: 2016/5/27
 * Time: 11:11
 */
$ch = curl_init();
$apikey = '7ed6d702775bf4e7eb21c902d3c29c37';
$mobile = $_POST['mobile'];
//$mobile = '15683694386';
$checkCode = '';
for($i=0 ; $i<6 ; $i++){
    $checkCode.=rand(0,9);
}
$content = '【秋云】您的验证码是'.$checkCode.'，有效时间5分钟，请不要告诉别人';
$url = 'http://apis.baidu.com/kingtto_media/106sms/106sms?mobile='.$mobile.'&content='.$content.'&tag=2';
$header = array(
    'apikey:'.$apikey,
);
// 添加apikey到header
curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// 执行HTTP请求
curl_setopt($ch , CURLOPT_URL , $url);
$res = curl_exec($ch);
$temp = object_array(json_decode($res));

$resArr=array(
    'message'=>$temp['returnstatus'],
    'checkCode'=>md5($checkCode)
);
echo json_encode($resArr);


function object_array($array)
{
    if(is_object($array))
    {
        $array = (array)$array;
    }
    if(is_array($array))
    {
        foreach($array as $key=>$value)
        {
            $array[$key] = object_array($value);
        }
    }
    return $array;
}