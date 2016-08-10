<?php
/**
 * Created by PhpStorm.
 * User: yijiangqiushui
 * Date: 2016/5/28
 * Time: 16:42
 */
include_once '../../../../common/mysql_config.php';
class DB{
    private $conn = "";
    /**
     * 功能：初始化构造函数，连接数据库
     */
    public function __construct(){
        try{
            $this->conn = mysql_connect(SERVERNAME,USERNAME,PASSWORD);

        }catch (Exception $e){
            $msg = $e;
            include (ERRFILE);
        }
        try{
            mysql_select_db(DBNAME,$this->conn);
        }catch (Exception $e){
            $msg = $e;
            include (ERRFILE);
        }
    }

    /**
     * 功能：获取mysql版本
     * 返回：版本号
     */
    public function getMySqlVer(){
        return mysql_get_server_info ();
    }
    /*
     * 功能：查询数据
     * 输入：sql语句
     * 返回：如果正确返回结果（二维数组），如果错我返回false
    */
    public function selectData($sql = ""){
        if(empty($sql)){
            return false;
        }
        if(empty($this->conn)){
            return false;
        }
        try{
            $result = mysql_query($sql,$this->conn);
        }catch (Exception $e){
            $msg = $e;
            include (ERRFILE);
        }
        if((!$result) or empty($result)){
//            mysql_free_result($result);
            return false;
        }

        $count = 0 ;
        $data = array();
        while($row = mysql_fetch_assoc($result)){
            $data[$count] = $row;
            $count++;
        }
//        mysql_free_result($result);
        return $data;
    }
    /*
     * 功能：插入数据
     * 输入：sql语句
     * 返回：如果正确返回插入的id，如果错误返回false
    */

    public function insertData($sql = ""){
        if(empty($sql)){
            return false;
        }
        if(empty($this->conn)){
            return false;
        }
        try{
            $result = mysql_query($sql,$this->conn);
        }catch (Exception $e){
            $msg = $e;
            include (ERRFILE);
        }
        if(!$result){
            return false;
        }
        $insertId = mysql_insert_id($this->conn);
        return $insertId;
    }
    /*
    * 功能：更新数据
    * 输入：sql语句
    * 返回：如果正确返回插入的id，如果错误返回false
   */
    public function updateData($sql = ""){
        if(empty($sql)){
            return false;
        }
        if(empty($this->conn)){
            return false;
        }
        try{
            $result = mysql_query($sql,$this->conn);
        }catch (Exception $e){
            $msg = $e;
            include (ERRFILE);
        }

        return $result;
    }

}