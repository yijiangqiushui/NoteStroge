<?php
/**
 * Created by PhpStorm.
 * User: yijiangqiushui
 * Date: 2016/5/28
 * Time: 16:37
 */
include_once "../class/db.cls.php";

$db = new DB();

$username = $_POST['username'];
$password = $_POST['password'];
$mobile = $_POST['mobile'];

$sql = "INSERT INTO username (username , securcode , phone) VALUES ('$username','$password','$mobile')";
$result = $db->insertData($sql);
echo $result;