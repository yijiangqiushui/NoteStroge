<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/6/2
 * Time: 18:32
 */
include_once "../class/db.cls.php";

$db = new DB();
$res = array();
$username = $_POST['username'];

$sql = "SELECT * FROM username WHERE username = '$username'";
$result = $db->selectData($sql);
$result = json_decode($result);
if(!empty($result)){
     $res['code'] = 0;
     echo json_encode($res);
}else{
    $res['code'] = 1;
    echo json_encode($res);
}
