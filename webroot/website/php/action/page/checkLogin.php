<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/6/4
 * Time: 11:20
 */
include_once "../class/db.cls.php";
$db = new DB();
$data = array();

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM username WHERE username='$username'";
$result = $db->selectData($sql);
/*
 * code=1:用户名密码正确
 * code=2：用户名正确密码不正确
 * code=3:用户名不正确
 * */
if(!empty($result)){
    if($password = $result[0]["securcode"]){
        $data['code'] = 1;
    }else{
        $data['code'] = 2;
    }
}else{
    $data['code'] = 3;
}
echo json_encode($data);